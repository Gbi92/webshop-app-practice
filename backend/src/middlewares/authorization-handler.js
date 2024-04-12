import jwt from "jsonwebtoken";
import config from "../config";

export const authorization = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!authHeader) return res.status(401).json({ "status": "error",  "message": "Token is missing" });

  jwt.verify(token, config.tokenSecret, (err, user) => {

    if (err) return res.status(401).json({ "status": "error",  "message": "Invalid token" });

    req.headers['userInfo'] = user;

    next();
  })
};
