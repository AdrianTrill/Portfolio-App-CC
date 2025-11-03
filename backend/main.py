from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from routers import apps as apps_router


def get_cors_origins() -> list[str]:
    origins_env = os.getenv("API_CORS_ORIGINS", "http://localhost:3000")
    return [origin.strip() for origin in origins_env.split(",") if origin.strip()]


app = FastAPI(title="Portfolio App API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def root_health():
    return {"status": "UP"}


app.include_router(apps_router.router, prefix="/api")


