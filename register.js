import { db } from "../lib/db";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, displayName, password } = req.body;

    if (db.users.find(u => u.username === username)) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      displayName,
      password,
      reports: 0,
      bans: 0
    };

    db.users.push(newUser);
    res.status(200).json({ message: "Registered successfully", user: newUser });
  } else {
    res.status(405).end();
  }
}