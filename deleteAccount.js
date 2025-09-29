import { db } from "../lib/db";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username } = req.body;
    db.users = db.users.filter(u => u.username !== username);

    res.status(200).json({ message: "Account deleted" });
  } else {
    res.status(405).end();
  }
}