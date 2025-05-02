const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).send({ error: "Invalid or expired token" });
  }
};

const verifyAdmin = (req, res, next) => {
  verifyUser(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).send({ error: "Admin access required" });
    }
  });
};

module.exports = { verifyUser, verifyAdmin };
