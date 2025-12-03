const jwt = require("jsonwebtoken");

module.exports = function adminOnly(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Missing token" });

  const token = header.split(" ")[1];

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (data.role !== "admin") {
      return res.status(403).json({ error: "Admins only" });
    }

    req.user = data;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};