import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import sequelize from "./config/db.js";

import { errorMessage } from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors({
  credentials: true,
  origin: `http://localhost:${process.env.PORT}`,
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 8 * 60 * 60 * 1000 // 8 jam
    }
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// healthcheck
app.get("/", (_req, res) => res.json({ ok: true, name: "koperasi-backend" }));

app.use("/api", apiRoutes);

// Tes koneksi database
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected...");
    await sequelize.sync({ alter: true });
    console.log("✅ Models synchronized...");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server is running on http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error("❌ Can't connect to the database:", err.message);
    process.exit(1);
  }
};

if (process.argv.includes("--sync-only")) {
  sequelize.authenticate()
  .then(() => sequelize.sync({ alter: true , logging: console.log }))
  .then(() => { console.log("Synced & exit"); process.exit(0); });
} else {
  start();
}

// error handler
app.use(errorMessage);



