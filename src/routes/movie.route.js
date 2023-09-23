import express from "express";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.post("/addfavorite", addFavorite);
router.get("/favorites", getFavorites);
router.put("/remove/:id", removeFavorite);

export default router;
