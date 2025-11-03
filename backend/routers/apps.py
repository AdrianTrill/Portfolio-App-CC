import asyncio
import json
from pathlib import Path
from typing import List, Optional

from fastapi import APIRouter, HTTPException

from services.health import compute_status
from models.schemas import AppInfo, HealthResponse


router = APIRouter()

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "apps_seed.json"


def load_seed() -> List[AppInfo]:
    try:
        with open(DATA_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
        return [AppInfo.model_validate(item) for item in data]
    except FileNotFoundError as exc:
        raise HTTPException(status_code=500, detail="Seed data not found") from exc


@router.get("/apps", response_model=List[AppInfo])
async def list_apps():
    apps = load_seed()

    async def enrich(app: AppInfo) -> AppInfo:
        status = await compute_status(app.health.endpoint)
        app.health.status = status
        return app

    enriched = await asyncio.gather(*(enrich(app) for app in apps))
    return enriched


@router.get("/health/{app_id}", response_model=HealthResponse)
async def health_by_id(app_id: str):
    apps = load_seed()
    target: Optional[AppInfo] = next((a for a in apps if a.id == app_id), None)
    if not target:
        raise HTTPException(status_code=404, detail="App not found")

    status = await compute_status(target.health.endpoint)
    return HealthResponse(id=app_id, status=status)


