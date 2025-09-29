import { db } from "../lib/db";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username } = req.body;
    const user = db.users.find(u => u.username === username);

    if (!user) return res.status(404).json({ error: "User not found" });

    user.bans += 1;

    if (user.bans >= 3) {
      db.users = db.users.filter(u => u.username !== username);
      return res.status(200).json({ message: "User permanently deleted" });
    }

    res.status(200).json({ message: `User banned (${user.bans} times)` });
  } else {
    res.status(405).end();
  }
}