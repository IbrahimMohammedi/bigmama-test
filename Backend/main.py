from fastapi import FastAPI, HTTPException
from transformers import pipeline

app = FastAPI()

summarizer = pipeline("summarization")

@app.get("/")
def read_root():
    return {"message": "Hello, there"}

@app.post("/summarize")
async def summarize_text(text: str, max_length: int = 150):
    try:
        summary = summarizer(text, max_length=max_length, min_length=50, length_penalty=2.0, num_beams=4, early_stopping=True)[0]['summary_text']
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error summarizing text: {str(e)}")
