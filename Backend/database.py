from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import HTTPException

class MongoDB:
    def __init__(self, database_url: str, database_name: str):
        self.client = AsyncIOMotorClient(database_url)
        self.db = self.client[database_name]
        self.collection = self.db["summaries"]

    async def insert_summary(self, user_input: str, max_length: int, summary: str):
        try :
            result = await self.collection.insert_one(
                {
                    "user_input": user_input, 
                    "max_length": max_length,
                    "summary": summary
                }
            )
            return str(result.inserted_id)
        except Exception as e:
            raise HTTPException(status_code=409, detail={"error": f"Failed to create summary: {str(e)}"})
        
mongo_db = MongoDB("mongodb://localhost:27017/", "SummarizationDB")