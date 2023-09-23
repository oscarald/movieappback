import jwt from "jsonwebtoken";
const generateToken = (userId) => {
  const expiresIn = 10 * 60;
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn,
  });

  return { token, expiresIn };
};

export default generateToken;
