import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { userID } = req.query;
  if (!userID) return res.status(400).json({ error: "Missing userID" });

  try {
    const sql = neon(process.env.DATABASE_URL);

    const rows = await sql`
      SELECT * FROM orders
      WHERE user_id = ${userID}
      ORDER BY created_at DESC
    `;

    return res.status(200).json({ orders: rows });
  } catch (err) {
    console.error("get-orders error:", err);
    return res.status(500).json({ error: err.message });
  }
}
