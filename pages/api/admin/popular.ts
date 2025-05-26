// GET /api/admin/popular-events - Top events in last 30 days

import { getDB } from "../../../lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;
  const offset = (page - 1) * limit;

  try {
    const db = await getDB();

    const events = await db.all(
      `
      SELECT 
        e.id, 
        e.title, 
        e.location, 
        e.date, 
        e.description, 
        COUNT(r.id) as registrations
      FROM events e
      JOIN registrations r ON e.id = r.event_id
      WHERE r.created_at >= DATE('now', '-30 days')
      GROUP BY e.id
      ORDER BY registrations DESC
      LIMIT ? OFFSET ?
      `,
      limit,
      offset
    );

    if (!events || events.length === 0) {
      return res.status(404).json({ error: "No popular events found" });
    }

    const totalRow = await db.get(`
      SELECT COUNT(DISTINCT e.id) as count
      FROM events e
      JOIN registrations r ON e.id = r.event_id
      WHERE r.created_at >= DATE('now', '-30 days')
    `);

    const totalCount = (totalRow as { count: number })?.count ?? 0;

    res.status(200).json({
      events,
      page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error("Error fetching popular events:", error);
    res.status(500).json({ error: "Failed to fetch popular events" });
  }
}
