// GET /api/events/:id - Fetch single event details

import type { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req;

  const db = await getDB();

  try {
    const event = await db.get(
      "SELECT id, title, location, date, description FROM events WHERE id = ?",
      id
    );

    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

