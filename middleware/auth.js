const { UnauthenticatedError } = require('../errors')
const jwt = require("jsonwebtoken");

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("NO token provided");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //assign it to req.user so you can get it from dashboard controller 
    const {id,username}=decoded
    req.user={id,username};
    next();
  } catch (error) {
    throw new UnauthenticatedError("NOt Authorized to access this route ");
  }
};

module.exports = authenticationMiddleware;
