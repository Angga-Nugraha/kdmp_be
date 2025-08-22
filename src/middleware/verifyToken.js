import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({
      status: "failed",
      message: "No token provided"
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log(`authHeader : ${decoded}`);
    if (err) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized"
      });
    }
    req.user = decoded;
    next();
  });
};
