import User from "../models/users.js";
import generateToken from "../helpers/generateToken.js";

const createUser = async (req, res) => {
  try {
    const { username, names, firstLastname, secondLastname, password } =
      req.body;
    if (!username || !names || !firstLastname || !secondLastname || !password) {
      return res.status(404).json({ error: "Faltan campos" });
    }
    await User.create({
      username,
      names,
      firstLastname,
      secondLastname,
      password,
    });
    return res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(404).json({ error: "Faltan campos" });
    }
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const valid = await user.verifyPassword(password);
    if (!valid) return res.status(400).json({ error: "Contraseña incorrecta" });
    const { token, expiresIn } = generateToken(user._id);
    const usr = {
      username: user.username,
      names: user.names,
      firstLastname: user.firstLastname,
      secondLastname: user.secondLastname,
      token,
      expiresIn,
    };
    return res.status(200).json(usr);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export { createUser, loginUser };
