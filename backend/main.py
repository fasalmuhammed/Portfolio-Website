from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from contextlib import asynccontextmanager
from database import seed_db
from routes.chat import router as chat_router
from routes.admin import router as admin_router
import os

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    await seed_db()
    yield


app = FastAPI(title="Fasal Portfolio API", lifespan=lifespan)

default_origins = [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://fasalmuhammed.in",
    "https://www.fasalmuhammed.in",
    "https://fasalmuhammed.me",
    "https://www.fasalmuhammed.me",
]
frontend_origins = [
    origin.strip()
    for origin in os.getenv("FRONTEND_ORIGINS", "").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=default_origins + frontend_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/api")
app.include_router(admin_router, prefix="/admin")


@app.get("/")
def root():
    return {"status": "ok", "message": "Fasal Portfolio API running."}
