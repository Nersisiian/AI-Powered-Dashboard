from __future__ import annotations

from fastapi import APIRouter

router = APIRouter()


@router.get("/status")
def get_status() -> dict:
    return {"status": "ok"}


@router.get("/data")
def get_data() -> dict:
    return {"items": [{"name": "Item1"}, {"name": "Item2"}]}
