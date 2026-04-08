# syntax=docker/dockerfile:1

############################
# Backend image
############################
FROM python:3.11-slim AS backend

WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

COPY app_backend/requirements.txt /app/app_backend/requirements.txt
RUN pip install --no-cache-dir -r /app/app_backend/requirements.txt

COPY app_backend /app/app_backend

EXPOSE 8000
CMD ["uvicorn", "app_backend.main:app", "--host", "0.0.0.0", "--port", "8000"]


############################
# Frontend build
############################
FROM node:20-alpine AS frontend-build
WORKDIR /app

COPY app_frontend/package.json /app/package.json
COPY app_frontend/babel.config.cjs /app/babel.config.cjs
COPY app_frontend/vite.config.js /app/vite.config.js
COPY app_frontend/index.html /app/index.html
COPY app_frontend/src /app/src

RUN npm install
RUN npm run build


############################
# Frontend runtime (nginx)
############################
FROM nginx:1.27-alpine AS frontend

COPY app_frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

