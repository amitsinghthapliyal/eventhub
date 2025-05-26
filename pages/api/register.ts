// POST /api/register - Register for an event

import { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { name, userEmail, eventId } = req.body;

  if (!name || !userEmail || !eventId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const db = await getDB();

  try {
    await db.run(
      "INSERT INTO registrations (event_id, name, email) VALUES (?, ?, ?)",
      eventId,
      name,
      userEmail
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
}
