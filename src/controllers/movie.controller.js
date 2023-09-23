import Movie from "../models/movies.js";
import Favorite from "../models/favorites.js";
import User from "../models/users.js";

const addFavorite = async (req, res) => {
  try {
    const { title, year, genre, director, poster, actors, imdbID, userId } =
      req.body;
    if (!title || !year || !genre || !director || !poster || !imdbID || !userId)
      res.status(404).json({ error: "Faltan campos" });
    let movie;
    movie = await Movie.findOne({ imdbID });
    if (!movie) {
      movie = await Movie.create({
        title,
        year,
        genre,
        director,
        poster,
        actors,
        imdbID,
      });
    }
    console.log({ userId: userId, movieId: movie._id });
    const fav = await Favorite.findOne({ userId: userId, movieId: movie._id });
    if (fav) {
      if (fav.status === "active")
        return res.status(404).json({ error: "Pelicula ya está en favoritos" });
      await Favorite.findByIdAndUpdate(
        fav._id,
        { status: "active" },
        { new: true }
      );
      return res.status(200).json({ message: "Pelicula añadida a favoritos" });
    }
    await Favorite.create({ userId, movieId: movie._id });
    return res.status(200).json({ message: "Pelicula añadida a favoritos" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "No existe el usuario" });
    const favorites = await Favorite.find({
      userId: user._id,
      status: "active",
    }).populate("movieId");

    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Favorite.findByIdAndUpdate(
      id,
      { status: "inactive" },
      { new: true }
    );
    return res.status(200).json(removed);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export { addFavorite, getFavorites, removeFavorite };
