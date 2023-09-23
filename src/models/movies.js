import { Schema, model } from "mongoose";

const movieSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    year: {
      type: Number,
      trim: true,
      required: true,
    },
    director: {
      type: String,
      trim: true,
      required: true,
    },
    actors: {
      type: String,
      trim: true,
      required: true,
    },
    genre: {
      type: String,
      trim: true,
      required: true,
    },
    poster: {
      type: String,
      trim: true,
      required: true,
    },
    imdbID: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Movie", movieSchema);
