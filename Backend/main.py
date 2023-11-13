from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from database import MongoDB
import logging

# Set up the root logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Define a custom logging formatter
log_formatter = logging.Formatter("[%(asctime)s] [%(levelname)s] [%(module)s] - %(message)s")

# Create a file handler to log to a file
file_handler = logging.FileHandler("app.log")
file_handler.setFormatter(log_formatter)
logger.addHandler(file_handler)

# Initialize FastAPI app
app = FastAPI()

# Connect to MongoDB
mongo_db = MongoDB("mongodb://localhost:27017/", "SummarizationDB")

# Set up CORS (Cross-Origin Resource Sharing) middleware
origins = ["http://localhost:3000"]  # Adjust this to the actual origin of your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the summarizer pipeline
summarizer = pipeline("summarization")

# Health check
@app.get("/")
def read_root():
    return {"message": "Hello, there"}

# CRUD operations:

# Post a summary
@app.post("/api/summarize")
async def summarize_text(data: dict):
    try:
        text = data.get("text", "")
        max_length = data.get("max_length", 150)

        if not text:
            raise HTTPException(status_code=400, detail={"error": "Please enter a text to summarize: "})

        summary = summarizer(text, max_length=max_length, min_length=50, length_penalty=2.0, num_beams=4, early_stopping=True)[0]['summary_text']
        mongo_id = await mongo_db.create_summary(user_input=text, max_length=max_length, summary=summary)

        return {"summary": summary, "mongo_id": mongo_id}
    except HTTPException as http_error:
        # Log validation errors
        logger.error(f"Validation error: {str(http_error)}")
        raise http_error
    except Exception as e:
        # Log unhandled exceptions
        logger.exception(f"Unhandled exception: {str(e)}")
        raise HTTPException(status_code=500, detail={"error": f"Error summarizing text: {str(e)}"})

# Get all summaries
@app.get("/api/summaries")
async def get_summaries():
    try:
        summaries = await mongo_db.read_summaries()
        return summaries
    except Exception as e:
        # Log errors during reading summaries
        logger.error(f"Error reading summaries: {str(e)}")
        raise HTTPException(status_code=500, detail={"error": f"Error reading summaries: {str(e)}"})

# Get a summary for a given id
@app.get("/api/summary/{summary_id}")
async def get_summary(summary_id: str):
    try:
        summary = await mongo_db.read_summary(summary_id)
        return {"summary": summary}
    except HTTPException as http_error:
        return http_error
    except Exception as e:
        # Log errors during reading a summary by id
        logger.error(f"Error reading summary: {str(e)}")
        raise HTTPException(status_code=500, detail={"error": f"Error reading summary: {str(e)}", "original_exception": str(type(e))})

# Update a summary for a given id
@app.put("/api/summary/{summary_id}")
async def update_summary(summary_id: str, data: dict):
    try:
        result = await mongo_db.update_summary(summary_id, data)
        return result
    except HTTPException as http_error:
        return http_error
    except Exception as e:
        # Log errors during updating a summary by id
        logger.error(f"Error updating summary: {str(e)}")
        raise HTTPException(status_code=500, detail={"error": f"Error updating summary: {str(e)}", "original_exception": str(type(e))})

# Delete a summary for a given id   
@app.delete("/api/summary/{summary_id}")
async def delete_summary(summary_id: str):
    try:
        result = await mongo_db.delete_summary(summary_id)
        return result
    except HTTPException as http_error:
        return http_error
    except Exception as e:
        # Log errors during deleting a summary by id
        logger.error(f"Error deleting summary: {str(e)}")
        raise HTTPException(status_code=500, 
                            detail={"error": f"Error deleting summary: {str(e)}", 
                            "original_exception": str(type(e))})