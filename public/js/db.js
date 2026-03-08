// db.js — Neon PostgreSQL via HTTP API
// Uses Neon's serverless driver over fetch (no Node.js needed)

const NEON_API = "https://ep-holy-cherry-a1wdz4s5-pooler.ap-southeast-1.aws.neon.tech/sql";
const NEON_KEY = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"; // placeholder

// ─── Low-level query helper ───────────────────────────────────────────────────
async function sql(query, params = []) {
    const res = await fetch(NEON_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": NEON_KEY,
            "Neon-Connection-String": getNeonConnStr()
        },
        body: JSON.stringify({ query, params })
    });
    if (!res.ok) {
        const err = await res.text();
        throw new Error("Neon query failed: " + err);
    }
    return res.json();
}

function getNeonConnStr() {
    // This is replaced with the real connection string
    return "postgresql://neondb_owner:npg_placeholder@ep-placeholder.neon.tech/neondb?sslmode=require";
}

export { sql };
