import { db } from "../lib/db";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { reporter, target } = req.body;
    if (reporter === target) {
      return res.status(400).json({ error: "You can’t report yourself" });
    }

    const targetUser = db.users.find(u => u.username === target);
    if (!targetUser) return res.status(404).json({ error: "Target not found" });

    targetUser.reports += 1;

    // Auto-ban after 3 reports
    if (targetUser.reports >= 3) {
      targetUser.bans += 1;
      targetUser.reports = 0;
    }

    res.status(200).json({ message: "Report submitted", targetUser });
  } else {
    res.status(405).end();
  }
}
