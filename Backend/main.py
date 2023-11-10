from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
import asyncio

app = FastAPI()

origins = ["http://localhost:3000"] 
app.add_middleware(
    CORSMiddleware,
    allow_origins= origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

summarizer = pipeline("summarization")

@app.get("/")
def read_root():
    return {"message": "Hello, there"}

@app.post("/api/summarize")
async def summarize_text(data: dict):
    try:
        text = data.get("text", "")
        max_length = data.get("max_length", 150)

        if not text:
            raise HTTPException(status_code=400, detail={"error": "Please enter a text to summarize: "})

        summary = summarizer(text, max_length=max_length, min_length=50, length_penalty=2.0, num_beams=4, early_stopping=True)[0]['summary_text']
        return {"summary": summary}
    except HTTPException as http_error:
        raise http_error
    except Exception as e:
        raise HTTPException(status_code=500, detail={"error": f"Error summarizing text: {str(e)}"})