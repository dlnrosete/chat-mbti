import { db } from "../lib/db";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const user = db.users.find(u => u.username === username && u.password === password);

    if (!user) return res.status(401).json({ error: "Invalid login" });

    res.status(200).json({ message: "Login success", user });
  } else {
    res.status(405).end();
  }
}
