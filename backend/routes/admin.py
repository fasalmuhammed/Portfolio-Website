from fastapi import APIRouter, HTTPException, Header
from models import KnowledgeCreate, KnowledgeUpdate, KnowledgeItem
from database import DB_PATH
from typing import List, Optional
import aiosqlite
import os

router = APIRouter()


def verify_key(x_admin_key: Optional[str]):
    expected = os.getenv("ADMIN_API_KEY", "changeme")
    if x_admin_key != expected:
        raise HTTPException(status_code=401, detail="Invalid admin key.")


@router.get("/knowledge", response_model=List[KnowledgeItem])
async def list_knowledge(x_admin_key: Optional[str] = Header(None)):
    verify_key(x_admin_key)
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            "SELECT id, category, question, answer, created_at FROM knowledge ORDER BY category, id"
        )
        rows = await cursor.fetchall()
        return [dict(r) for r in rows]


@router.post("/knowledge", response_model=KnowledgeItem, status_code=201)
async def add_knowledge(item: KnowledgeCreate, x_admin_key: Optional[str] = Header(None)):
    verify_key(x_admin_key)
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute(
            "INSERT INTO knowledge (category, question, answer) VALUES (?, ?, ?)",
            (item.category, item.question, item.answer),
        )
        await db.commit()
        new_id = cursor.lastrowid
        db.row_factory = aiosqlite.Row
        row = await (await db.execute("SELECT * FROM knowledge WHERE id=?", (new_id,))).fetchone()
        return dict(row)


@router.put("/knowledge/{item_id}", response_model=KnowledgeItem)
async def update_knowledge(
    item_id: int,
    item: KnowledgeUpdate,
    x_admin_key: Optional[str] = Header(None),
):
    verify_key(x_admin_key)
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        existing = await (
            await db.execute("SELECT * FROM knowledge WHERE id=?", (item_id,))
        ).fetchone()
        if not existing:
            raise HTTPException(status_code=404, detail="Entry not found.")
        existing = dict(existing)

        category = item.category if item.category is not None else existing["category"]
        question = item.question if item.question is not None else existing["question"]
        answer = item.answer if item.answer is not None else existing["answer"]

        await db.execute(
            "UPDATE knowledge SET category=?, question=?, answer=? WHERE id=?",
            (category, question, answer, item_id),
        )
        await db.commit()
        row = await (await db.execute("SELECT * FROM knowledge WHERE id=?", (item_id,))).fetchone()
        return dict(row)


@router.delete("/knowledge/{item_id}", status_code=204)
async def delete_knowledge(item_id: int, x_admin_key: Optional[str] = Header(None)):
    verify_key(x_admin_key)
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("DELETE FROM knowledge WHERE id=?", (item_id,))
        await db.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Entry not found.")
