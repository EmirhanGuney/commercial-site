import "express-async-errors";
import "dotenv/config";
import express from "express";
import { connectDB } from "./config/database.config.js";
import CONFIGS from "./config/config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware.js";
import { authenticateMiddleware } from "./middlewares/authenticate.middleware.js";

const app = express();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// app.use(async (req, res, next) => {
//   await delay(2000);
//   next();
// })d;

app.use(cors({
  origin: ["http://localhost:5000", "http://localhost:5001" ,"https://nanocamkesmemakinesi.com","https://www.nanocamkesmemakinesi.com"],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//authentication
app.use(authenticateMiddleware);

app.use("/api", routes);

const PORT = CONFIGS.Port || 3000;

app.use(errorHandlerMiddleware);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();

export default app;