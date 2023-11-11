from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import HTTPException

# Defining the MongoDB class
class MongoDB:
    def __init__(self, database_url: str, database_name: str):
        self.client = AsyncIOMotorClient(database_url)
        self.db = self.client[database_name]
        self.collection = self.db["summaries"]

    # Create function
    async def create_summary(self, user_input: str, max_length: int, summary: str):
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
        
    async def read_summaries(self):
        try:
            cursor = self.collection.find({})
            summaries = [summary async for summary in cursor]
            # Convert ObjectId to str for JSON serialization
            for summary in summaries:
                summary['_id'] = str(summary['_id'])
            return summaries
        except Exception as e:
            raise HTTPException(status_code=500, detail={"error": f"Error reading summaries: {str(e)}"})

mongo_db = MongoDB("mongodb://localhost:27017/", "SummarizationDB")