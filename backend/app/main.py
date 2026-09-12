from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import TriageRequest, TriageResult
from app.llm_client import triage_request

app = FastAPI(title="ResolveAI Triage API")

# Origins allowed to call this API from a browser.
# Local Vite dev server + your deployed Vercel domain.
origins = [
    "http://localhost:5173",
    "https://resolve-ai-green.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    """Simple endpoint to confirm the server is up (also warms Render's free tier)."""
    return {"status": "ok"}


@app.post("/triage", response_model=TriageResult)
def triage(payload: TriageRequest):
    try:
        return triage_request(payload.request_text)
    except Exception as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Triage failed: {str(exc)}",
        )