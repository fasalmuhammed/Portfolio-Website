import aiosqlite
import asyncio
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "knowledge.db")

CREATE_TABLE = """
CREATE TABLE IF NOT EXISTS knowledge (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    question TEXT,
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"""

SEED_DATA = [
    ("bio", "Who are you?",
     "I am Muhammed Fasal, a software engineer who recently completed my MCA (Master of Computer Applications). I am passionate about Software Engineering, Backend Development, AI/ML, and building real-world applications."),

    ("bio", "Where are you from?",
     "I am based in Kozhikode, Kerala, India."),

    ("bio", "What is your educational background?",
     "I completed my MCA (Master of Computer Applications) in 2025. My studies focused on software engineering, web development, databases, and AI/ML concepts."),

    ("career", "What kind of job are you looking for?",
     "I am actively looking for opportunities as a Backend Developer, Software Engineer, or AI/ML Fresher. I want to work in product-based or AI-focused companies."),

    ("career", "Are you available for hire?",
     "Yes! I am currently open to opportunities. I am looking for backend developer, software engineer, or AI/ML fresher roles. Feel free to reach out via the contact section."),

    ("skills", "What are your technical skills?",
     "My technical skills include: Python, Django, REST API Development, SQL and Database Management, HTML/CSS/JavaScript, React (basic), Machine Learning basics, AI/ML concepts, Prompt Engineering, and Git & GitHub."),

    ("skills", "What is your primary programming language?",
     "Python is my primary programming language. I use it for backend development with Django and FastAPI, as well as for machine learning projects."),

    ("skills", "What frameworks do you know?",
     "I work with Django and FastAPI for backend development, and React for basic frontend work. I am experienced in building REST APIs."),

    ("projects", "Tell me about your projects",
     "I have built 4 projects: SmartWear (AI-powered fashion recommendation), Kidney Allocation System (healthcare donor-recipient matching), Hostel Allocation Management System (web app for student accommodation), and i-Dine (full-stack restaurant ordering platform)."),

    ("projects", "What is SmartWear?",
     "SmartWear is an AI-powered fashion recommendation and smart styling platform. It gives personalized outfit suggestions based on user preferences and current trends using AI/ML. This was one of my most exciting projects as it combines AI with a real-world consumer use case."),

    ("projects", "What is the Kidney Allocation System?",
     "The Kidney Allocation System is a healthcare-based platform I built to manage donor-recipient matching and improve the kidney allocation process. It focuses on efficiency and accuracy in a critical medical domain."),

    ("projects", "What is the Hostel Allocation Management System?",
     "The Hostel Allocation Management System is a web application to automate hostel room allocation, track vacancies in real-time, and manage student accommodation efficiently. Built with Python, Django, and SQLite."),

    ("projects", "What is i-Dine?",
     "i-Dine is a smart restaurant ordering system — a full-stack platform with menu management, shopping cart, real-time order tracking, and a REST API backend. Built using React, FastAPI, and REST API architecture."),

    ("interests", "What are your interests?",
     "I am interested in Backend Development, Artificial Intelligence, Full Stack Development, building scalable applications, learning new technologies, and problem solving."),

    ("contact", "How can I contact you?",
     "You can reach me via Email, LinkedIn, or GitHub — all links are in the Contact section of this portfolio. I am always happy to connect!"),

    ("availability", "When can you start?",
     "I am available to start immediately. I am actively looking for opportunities and can join as soon as a suitable role is confirmed."),
]


async def init_db():
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(CREATE_TABLE)
        await db.commit()


async def seed_db():
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(CREATE_TABLE)
        cursor = await db.execute("SELECT COUNT(*) FROM knowledge")
        row = await cursor.fetchone()
        if row[0] == 0:
            await db.executemany(
                "INSERT INTO knowledge (category, question, answer) VALUES (?, ?, ?)",
                SEED_DATA,
            )
            await db.commit()
            print(f"✅ Seeded {len(SEED_DATA)} knowledge entries.")
        else:
            print(f"ℹ️  Knowledge base already has {row[0]} entries. Skipping seed.")


async def get_all_knowledge():
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            "SELECT id, category, question, answer, created_at FROM knowledge ORDER BY category, id"
        )
        rows = await cursor.fetchall()
        return [dict(r) for r in rows]


async def build_system_prompt():
    knowledge = await get_all_knowledge()
    sections = {}
    for item in knowledge:
        cat = item["category"].upper()
        sections.setdefault(cat, []).append(item["answer"])

    parts = [
        "You are Muhammed Fasal's personal AI assistant on his portfolio website.",
        "Answer questions about him warmly and professionally.",
        "Keep responses concise — 2 to 4 sentences max.",
        "If asked something you don't know, say: 'I'm not sure about that — you can reach Fasal directly via the contact section.'",
        "Never make up information. Never discuss topics unrelated to Fasal's professional profile.",
        "",
        "Here is everything you know about Muhammed Fasal:",
        "",
    ]

    for section, answers in sections.items():
        parts.append(f"[{section}]")
        for a in answers:
            parts.append(f"- {a}")
        parts.append("")

    return "\n".join(parts)


if __name__ == "__main__":
    asyncio.run(seed_db())
    print("Database ready.")
