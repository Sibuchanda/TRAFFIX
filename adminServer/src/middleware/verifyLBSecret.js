import dotenv from "dotenv";
dotenv.config();

const verifyLBSecret = (req, res, next) => {
  const secret = req.headers["x-lb-secret"];

  if (!secret) {
    return res.status(401).json({
      success: false,
      message: "LB secret missing"
    });
  }

  if (secret !== process.env.LB_SECRET_KEY) {
    return res.status(403).json({
      success: false,
      message: "Invalid LB secret"
    });
  }

  next();
};

export default verifyLBSecret;
