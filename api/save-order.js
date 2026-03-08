import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const sql = neon(process.env.DATABASE_URL);

    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        user_email TEXT,
        date TEXT,
        name TEXT,
        contact TEXT,
        address TEXT,
        payment TEXT,
        items JSONB,
        total TEXT,
        status TEXT DEFAULT 'To Pay',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    const { orderID, userID, userEmail, date, name, contact, address, payment, items, total } = req.body;

    if (!orderID || !userID) return res.status(400).json({ error: "Missing required fields" });

    await sql`
      INSERT INTO orders (order_id, user_id, user_email, date, name, contact, address, payment, items, total, status)
      VALUES (${orderID}, ${userID}, ${userEmail || ""}, ${date}, ${name}, ${contact}, ${address}, ${payment}, ${JSON.stringify(items)}, ${total}, 'To Pay')
    `;

    return res.status(200).json({ success: true, orderID });
  } catch (err) {
    console.error("save-order error:", err);
    return res.status(500).json({ error: err.message });
  }
}
