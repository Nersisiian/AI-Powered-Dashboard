# AI-Powered Dashboard

React + FastAPI dashboard with Docker, tests, and CI/CD (GitHub Actions).

## Project structure

```
AI-Powered-Dashboard/
├─ app_backend/
├─ app_frontend/
├─ tests/
├─ Dockerfile
├─ docker-compose.yml
└─ .github/workflows/ci-cd.yml
```

## Backend (FastAPI)

Endpoints:
- `GET /status` → `{"status":"ok"}`
- `GET /data` → `{"items":[{"name":"Item1"},{"name":"Item2"}]}`

### Run locally (no Docker)

```bash
cd app_backend
python -m venv .venv
source .venv/bin/activate  # Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app_backend.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at `http://localhost:8000`.

## Frontend (React)

Frontend calls backend via `/api`:
- Dev server proxies `/api/*` → `http://localhost:8000/*`
- In Docker, nginx proxies `/api/*` → `backend:8000/*`

### Run locally (no Docker)

```bash
cd app_frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:3000`.

## Tests

### Backend tests (pytest)

From repo root:

```bash
pip install -r app_backend/requirements.txt
pytest -q
```

### Frontend tests (jest + React Testing Library)

```bash
cd app_frontend
npm install
npm test
```

## Docker

Build & run both services:

```bash
docker compose up --build
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`

## CI/CD (GitHub Actions)

Workflow file: `.github/workflows/ci-cd.yml`

It runs:
- Backend: `black --check` + `pytest`
- Frontend: `eslint` + `jest`
- Docker: build and push images to DockerHub

### Required GitHub secrets (for Docker push)

Add repository secrets:
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN` (DockerHub access token)

Images pushed:
- `${DOCKERHUB_USERNAME}/ai-powered-dashboard-backend:latest`
- `${DOCKERHUB_USERNAME}/ai-powered-dashboard-frontend:latest`

