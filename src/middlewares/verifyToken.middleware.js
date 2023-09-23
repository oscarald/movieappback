import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET, (error, authdata) => {
      if (error) {
        return res.status(403).json({ message: "Unauthorized access" });
      } else {
        req.authdata = authdata;
        next();
      }
    });
    //req.token = bearerToken
    //next()
  } else {
    res.status(403).json({ message: "Unauthorized access" });
  }
};

export { verifyToken };
