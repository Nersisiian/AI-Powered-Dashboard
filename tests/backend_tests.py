from fastapi.testclient import TestClient

from app_backend.main import app

client = TestClient(app)


def test_status_ok():
    r = client.get("/status")
    assert r.status_code == 200
    assert r.json() == {"status": "ok"}


def test_data_items():
    r = client.get("/data")
    assert r.status_code == 200
    assert r.json() == {"items": [{"name": "Item1"}, {"name": "Item2"}]}
