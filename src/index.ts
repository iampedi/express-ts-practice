// src/index.ts
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes";
import { logger } from "./middleware/logger";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

// Built-in middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(limiter);
app.use(morgan("dev"));
app.use(express.json());
app.use(logger);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello TypeScript + Express!" });
});

app.use("/api/todos", todoRoutes);

app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
