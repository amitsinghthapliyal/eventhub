// GET /api/events - List events with pagination and filters

import type { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await getDB();

    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 5;
    const offset = (page - 1) * limit;

    const totalCountRow = await db.get(`
      SELECT COUNT(*) as count
      FROM events
    `);

    const totalCount = (totalCountRow as { count: number })?.count ?? 0;

    const events = await db.all(
      `
      SELECT id, title, location, date
      FROM events
      ORDER BY date ASC
      LIMIT ? OFFSET ?
      `,
      limit,
      offset
    );

    if (!events || events.length === 0) {
      return res.status(404).json({ error: "No events found" });
    }

    res.status(200).json({
      events,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
}
