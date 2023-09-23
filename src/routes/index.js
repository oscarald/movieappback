import express from "express";
import user from "./user.route.js";
import movie from "./movie.route.js";

const router = express.Router();

router.use("/user", user);
router.use("/movie", movie);

export default router;
