import express from "express";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/movie.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
const router = express.Router();

router.post("/addfavorite", verifyToken, addFavorite);
router.get("/favorites", verifyToken, getFavorites);
router.put("/remove/:id", verifyToken, removeFavorite);

export default router;
