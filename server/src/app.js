import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
const app = express();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));



app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
// Health Check Route
app.get("/api/v1/health", (req, res) => {
    res.json({
        success: true,
        message: "Server is running 🚀"
    });
});

export default app;