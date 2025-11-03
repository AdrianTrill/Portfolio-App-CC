from typing import List, Literal, Optional

from pydantic import BaseModel


class Architecture(BaseModel):
    short: str
    diagram_url: Optional[str] = None


class Health(BaseModel):
    endpoint: Optional[str] = None
    status: Literal["UP", "DOWN", "UNKNOWN"] = "UNKNOWN"


class AppInfo(BaseModel):
    id: str
    name: str
    description: str
    can_run_locally: bool
    platforms: List[str]
    tech_stack: List[str]
    tags: List[str]
    images: List[str]
    architecture: Architecture
    health: Health
    repo_url: Optional[str] = None
    docs_url: Optional[str] = None
    run: Optional[dict] = None  # { command: str, notes?: str }


class HealthResponse(BaseModel):
    id: str
    status: Literal["UP", "DOWN", "UNKNOWN"]


