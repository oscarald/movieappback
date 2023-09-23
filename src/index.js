import express from "express";
import "dotenv/config";
import "./database/db.conection.js";
import { errors } from "./middlewares/error.middleware.js";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use(errors);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Puerto corriendo en : ${port}`));
