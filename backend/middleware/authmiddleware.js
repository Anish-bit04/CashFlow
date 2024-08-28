const jwt = require("jsonwebtoken");

function authmiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userId) {
        // adding userId in request , so that we can access later
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(403).json({});
    }
  } catch (err) {
    return res.status(403).json({});
  }
}

module.exports = {authmiddleware};
