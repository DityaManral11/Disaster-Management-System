import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import sosRoutes from "./routes/sosRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import shelterRoutes from "./routes/shelterRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/shelters", shelterRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Disaster Management Backend Running");
});

// Check Database Connection
app.get("/test-db", (req, res) => {
  db.query("SELECT 1", (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
      });
    }

    res.json({
      success: true,
      message: "Database connected successfully",
    });
  });
});

// Fetch Registered Volunteers
app.get("/api/users/volunteers", (req, res) => {
  const sql = `
    SELECT 
      user_id,
      full_name,
      email,
      role
    FROM users
    WHERE role = 'volunteer'
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Volunteer fetch error:", err);
      return res.status(500).json({
        success: false,
        message: "Database error while fetching volunteers",
      });
    }

    res.json(result);
  });
});

// Dashboard Stats
app.get("/api/dashboard/stats", (req, res) => {
  const stats = {};

  db.query("SELECT COUNT(*) AS totalAlerts FROM alerts", (err, alerts) => {
    if (err) return res.status(500).json(err);

    stats.alerts = alerts[0].totalAlerts;

    db.query(
      "SELECT COUNT(*) AS totalShelters FROM shelters",
      (err, shelters) => {
        if (err) return res.status(500).json(err);

        stats.shelters = shelters[0].totalShelters;

        db.query(
          "SELECT COUNT(*) AS totalSOS FROM sos_requests",
          (err, sos) => {
            if (err) return res.status(500).json(err);

            stats.sos = sos[0].totalSOS;

            db.query(
              "SELECT COUNT(*) AS totalVolunteers FROM users WHERE role = 'volunteer'",
              (err, volunteers) => {
                if (err) return res.status(500).json(err);

                stats.volunteers = volunteers[0].totalVolunteers;

                res.json(stats);
              }
            );
          }
        );
      }
    );
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});