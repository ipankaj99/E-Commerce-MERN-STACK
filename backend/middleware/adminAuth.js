import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid authorization format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded.email !== process.env.ADMIN_EMAIL || decoded.role !== "admin") {
      return res.status(403).json({ message: "Invalid Admin Credentials" });
    }

    req.admin = decoded;
    next();

  } catch (err) {
    console.log("Admin auth error:", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please login again" });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export default adminAuth;
