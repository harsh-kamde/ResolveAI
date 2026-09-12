from enum import Enum
from pydantic import BaseModel, Field  


class Category(str, Enum):
    SALES = "Sales"
    SUPPORT = "Support"
    BILLING = "Billing"
    TECHNICAL = "Technical"
    OTHER = "Other"


class Priority(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    URGENT = "Urgent"


class Owner(str, Enum):
    SALES_TEAM = "Sales Team"
    CLIENT_SUCCESS = "Client Success"
    FINANCE = "Finance"
    ENGINEERING = "Engineering"


class TriageRequest(BaseModel):
    """What the frontend sends us."""
    request_text: str = Field(
        ...,
        min_length=5,
        description="The raw, unstructured client request text."
    )


class TriageResult(BaseModel):
    """What Gemini must return, and what we send back to the frontend."""
    summary: str = Field(..., description="1-2 sentence summary of the request.")
    category: Category
    priority: Priority
    priority_reason: str = Field(..., description="One sentence explaining the priority level.")
    owner: Owner
    draft_response: str = Field(..., description="A professional first-response draft, 2-4 sentences.")