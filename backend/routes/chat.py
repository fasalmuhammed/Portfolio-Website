from fastapi import APIRouter, HTTPException
from models import ChatRequest, ChatResponse
from database import build_system_prompt
from dotenv import load_dotenv
from openai import OpenAI
import os
from pathlib import Path

load_dotenv(Path(__file__).resolve().parents[1] / ".env")

router = APIRouter()

GROQ_MODEL = "llama-3.1-8b-instant"


def get_groq_client():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=503,
            detail="GROQ_API_KEY is not configured in backend/.env",
        )

    return OpenAI(
        base_url="https://api.groq.com/openai/v1",
        api_key=api_key,
    )

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        system_prompt = await build_system_prompt()

        messages = [
            {
                "role": "system",
                "content": system_prompt
            }
        ]

        # Previous chat history
        for m in request.history:
            role = "assistant" if m.role == "assistant" else "user"

            messages.append({
                "role": role,
                "content": m.content
            })

        # Current message
        messages.append({
            "role": "user",
            "content": request.message
        })

        completion = get_groq_client().chat.completions.create(
            model=GROQ_MODEL,
            messages=messages,
        )

        reply = completion.choices[0].message.content

        return ChatResponse(reply=reply)

    except HTTPException:
        raise
    except Exception as e:
        print(f"CHAT ERROR: {e}")
        raise HTTPException(status_code=500, detail=str(e))
