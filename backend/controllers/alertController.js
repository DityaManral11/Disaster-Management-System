import db from "../config/db.js";

// Get all alerts
export const getAlerts = (req, res) => {
  db.query("SELECT * FROM alerts ORDER BY created_at DESC", (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(results);
  });
};

// Create alert
export const createAlert = (req, res) => {
  const { title, description, location, severity } = req.body;

  const sql =
    "INSERT INTO alerts (title, description, location, severity) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [title, description, location, severity],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.status(201).json({
        message: "Alert created successfully",
      });
    }
  );
};