from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from fastapi import HTTPException

# Defining the MongoDB class
class MongoDB:
    def __init__(self, database_url: str, database_name: str):
        self.client = AsyncIOMotorClient(database_url)
        self.db = self.client[database_name]
        self.collection = self.db["summaries"]

    # Create summary
    async def create_summary(self, user_input: str, max_length: int, summary: str):
        try:
            # Insert a new summary document into the MongoDB collection
            result = await self.collection.insert_one(
                {
                    "user_input": user_input,
                    "max_length": max_length,
                    "summary": summary
                }
            )
            # Return the inserted document's ObjectId as a string
            return str(result.inserted_id)
        except Exception as e:
            raise HTTPException(status_code=409, detail={"error": f"Failed to create summary: {str(e)}"})

    # Read all summaries
    async def read_summaries(self):
        try:
            # Retrieve all documents from the MongoDB collection
            cursor = self.collection.find({})
            # Convert cursor to a list of summaries
            summaries = [summary async for summary in cursor]
            # Convert ObjectId to str for JSON serialization
            for summary in summaries:
                summary['_id'] = str(summary['_id'])
            return summaries
        except Exception as e:
            raise HTTPException(status_code=500, detail={"error": f"Error reading summaries: {str(e)}"})

    # Read summary by id
    async def read_summary(self, summary_id: str):
        try:
            # Convert summary_id to ObjectId
            object_id = ObjectId(summary_id)
            # Retrieve a single document from the MongoDB collection by ObjectId
            summary = await self.collection.find_one({"_id": object_id})

            if summary:
                # Convert ObjectId to str for JSON serialization
                summary['_id'] = str(summary['_id'])
                return summary
            else:
                # Raise an HTTPException with a 404 status code if the summary is not found
                raise HTTPException(status_code=404, detail={"error": "Summary not found"})
        except HTTPException as http_error:
            raise http_error
        except Exception as e:
            print(f"Error reading summary: {str(e)}")
            raise HTTPException(status_code=500, detail={"error": f"Error reading summary: {str(e)}", "original_exception": str(type(e))})

    # Update summary by id
    async def update_summary(self, summary_id: str, data: dict):
        try:
            # Convert summary_id to ObjectId
            object_id = ObjectId(summary_id)

            # Extract fields from data
            user_input = data.get("user_input")
            max_length = data.get("max_length")
            summary = data.get("summary")

            # Validate at least one field is provided
            if not any([user_input, max_length, summary]):
                raise HTTPException(status_code=400, detail={"error": "Please provide at least one field to update"})

            # Create update dictionary
            update_dict = {}
            if user_input:
                update_dict["user_input"] = user_input
            if max_length:
                update_dict["max_length"] = max_length
            if summary:
                update_dict["summary"] = summary

            # Perform update
            result = await self.collection.update_one({"_id": object_id}, {"$set": update_dict})

            # Check if the update was successful
            if result.matched_count == 0:
                raise HTTPException(status_code=404, detail={"error": "Summary not found"})

            return {"message": "Summary updated successfully"}
        except HTTPException as http_error:
            raise http_error
        except Exception as e:
            print(f"Error updating summary: {str(e)}")
            raise HTTPException(status_code=500, detail={"error": f"Error updating summary: {str(e)}", "original_exception": str(type(e))})

    # Delete summary by id
    async def delete_summary(self, summary_id: str):
        try:
            # Convert summary_id to ObjectId
            object_id = ObjectId(summary_id)

            # Delete a document from the MongoDB collection by ObjectId
            result = await self.collection.delete_one({"_id": object_id})

            if result.deleted_count == 0:
                raise HTTPException(status_code=404, detail={"error": "Summary not found"})
            else:
                return {"message": "Summary deleted successfully"}
        except HTTPException as http_error:
            raise http_error
        except Exception as e:
            print(f"Error deleting summary: {str(e)}")
            raise HTTPException(status_code=500, detail={"error": f"Error deleting summary: {str(e)}", "original_exception": str(type(e))})

mongo_db = MongoDB("mongodb://database:27017/", "SummarizationDB")