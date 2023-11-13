from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from database import MongoDB

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

        # Use the summarizer pipeline to generate a summary
        summary = summarizer(
            text, max_length=max_length, min_length=50, length_penalty=2.0, num_beams=4, early_stopping=True
        )[0]['summary_text']

        # Store the summary in MongoDB
        mongo_id = await mongo_db.create_summary(user_input=text, max_length=max_length, summary=summary)

        return {"summary": summary, "mongo_id": mongo_id}
    except HTTPException as http_error:
        raise http_error
    except Exception as e:
        raise HTTPException(status_code=500, detail={"error": f"Error summarizing text: {str(e)}"})

# Get all summaries
@app.get("/api/summaries")
async def get_summaries():
    summaries = await mongo_db.read_summaries()
    return summaries

# Get a summary for a given id
@app.get("/api/summary/{summary_id}")
async def get_summary(summary_id: str):
    try:
        summary = await mongo_db.read_summary(summary_id)
        return {"summary": summary}
    except HTTPException as http_error:
        return http_error

# Update a summary for a given id
@app.put("/api/summary/{summary_id}")
async def update_summary(summary_id: str, data: dict):
    try:
        result = await mongo_db.update_summary(summary_id, data)
        return result
    except HTTPException as http_error:
        return http_error

# Delete a summary for a given id   
@app.delete("/api/summary/{summary_id}")
async def delete_summary(summary_id: str):
    try:
        result = await mongo_db.delete_summary(summary_id)
        return result
    except HTTPException as http_error:
        return http_error