// src/index.ts
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes";
import { logger } from "./middleware/logger";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Built-in middleware
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
