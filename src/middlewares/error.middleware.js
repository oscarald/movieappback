const errors = (req, res, next) => {
  res.status(500).json({ error: "Recurso no encontrado" });
};

export { errors };
