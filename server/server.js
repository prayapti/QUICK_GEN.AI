import "dotenv/config";
import express from "express";
import cors from "cors";
//import "dotenv/config";
import { clerkMiddleware, requireAuth } from '@clerk/express';
import aiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";
const app = express();

await connectCloudinary()

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("server is live"));

app.use(requireAuth())
app.use("/api", geminiRoutes);

app.use("/api/ai", aiRouter);

app.use("/api/user", userRouter);


// Optional error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server error" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});

