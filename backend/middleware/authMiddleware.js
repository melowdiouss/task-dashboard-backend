import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // 1. Read Authorization header
    const authHeader = req.headers.authorization;

    // 2. Check if header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access denied" });
    }

    // 3. Extract token
    const token = authHeader.split(" ")[1];

    // 4. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Attach userId to request
    req.userId = decoded.userId;

    // 6. Allow request to continue
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default authMiddleware;
