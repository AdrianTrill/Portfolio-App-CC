from typing import Literal, Optional

import httpx


Status = Literal["UP", "DOWN", "UNKNOWN"]


async def compute_status(endpoint: Optional[str]) -> Status:
    if not endpoint:
        return "UNKNOWN"
    try:
        timeout = httpx.Timeout(1.5, connect=1.0)
        async with httpx.AsyncClient(timeout=timeout) as client:
            resp = await client.get(endpoint)
            return "UP" if resp.status_code == 200 else "DOWN"
    except Exception:
        return "DOWN"


