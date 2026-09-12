import os
import json
from google import genai
from google.genai import types
from dotenv import load_dotenv

from app.schemas import TriageResult
from app.prompts import SYSTEM_INSTRUCTION, build_contents

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError(
        "GEMINI_API_KEY is not set. Add it to backend/.env before starting the server."
    )

client = genai.Client(api_key=API_KEY)

MODEL_NAME = "gemini-2.5-flash-lite"


def triage_request(request_text: str) -> TriageResult:
    """
    Sends the request text to Gemini with structured output constrained
    to the TriageResult schema. Raises on failure so the API layer can
    decide how to respond to the client.
    """
    contents = build_contents(request_text)

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=contents,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_INSTRUCTION,
            response_mime_type="application/json",
            response_schema=TriageResult,
            temperature=0.2,
        ),
    )

    # response.text is a JSON string matching TriageResult's shape,
    # guaranteed by response_schema — but we still validate defensively.
    data = json.loads(response.text)
    return TriageResult.model_validate(data)