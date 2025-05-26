// GET /api/admin/daily - Registrations grouped by day

import { getDB } from "../../../lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await getDB();
    const stats = await db.all(`
      SELECT DATE(created_at) as date, COUNT(*) as count
      FROM registrations
      GROUP BY DATE(created_at)
      ORDER BY date DESC
      LIMIT 30;
    `);

    if (stats && stats.length > 0) {
      res.status(200).json(stats);
    } else {
      res.status(404).json({ error: "No registration data found" });
    }
  } catch (error) {
    console.error("Error fetching daily registrations:", error);
    res.status(500).json({ error: "Failed to fetch daily registrations" });
  }
}
