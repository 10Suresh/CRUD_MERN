const jwt = require("jsonwebtoken");
const secret = "Adnan";
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]
    if (!token) {
        return res.status(401).json({ error: "Not Token Available" })
    }
    try {
        const decode = jwt.verify(token, secret);
        req.user = decode
        next();
    } catch (error) {
      res.status(401).json({ error: "Not Token Available" })
    }
}
module.exports = authMiddleware