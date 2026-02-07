import express from "express";
import cors from "cors";
import routes from "routes";
import { errorHandler } from "@middlewares/error";
import { requestLogger } from "@middlewares/requestLogger";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use("/api/v1", routes);

app.use(errorHandler);

export default app;
