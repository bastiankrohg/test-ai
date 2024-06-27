from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from typing import List
from claude_wrapper import ClaudeWrapper
from vector_db import upsert_startup, query_similar_startups
import os

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

claude = ClaudeWrapper()

class Startup(BaseModel):
    name: str
    description: str
    industry: str
    funding: str
    website: HttpUrl

@app.post("/analyze_startup")
async def analyze_startup(startup: Startup):
    try:
        analysis = claude.analyze_startup(startup.dict())
        website_analysis = claude.analyze_website(str(startup.website))
        # Store the startup in the vector database
        upsert_startup(startup.dict())
        return {**analysis, **website_analysis}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze_website")
async def analyze_website(url: HttpUrl):
    try:
        website_analysis = claude.analyze_website(str(url))
        return website_analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ... (keep other existing endpoints)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))
