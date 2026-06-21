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

app.get("/", (req, res) => {
  res.send("🚀 Disaster Management Backend Running");
});

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

// Get user profile
app.get("/api/users/profile/:id", (req, res) => {
  const sql = `
    SELECT 
      user_id, full_name, email, role,
      phone, city, blood_group,
      availability, emergency_contact, skills
    FROM users
    WHERE user_id = ?
  `;

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error("Profile fetch error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result[0]);
  });
});

// Update user profile
app.put("/api/users/profile/:id", (req, res) => {
  const {
    full_name,
    phone,
    city,
    blood_group,
    availability,
    emergency_contact,
    skills,
  } = req.body;

  const sql = `
    UPDATE users
    SET 
      full_name = ?,
      phone = ?,
      city = ?,
      blood_group = ?,
      availability = ?,
      emergency_contact = ?,
      skills = ?
    WHERE user_id = ?
  `;

  db.query(
    sql,
    [
      full_name,
      phone,
      city,
      blood_group,
      availability,
      emergency_contact,
      skills,
      req.params.id,
    ],
    (err) => {
      if (err) {
        console.error("Profile update error:", err);
        return res.status(500).json({
          success: false,
          message: "Profile update failed",
        });
      }

      res.json({
        success: true,
        message: "Profile updated successfully",
      });
    }
  );
});

// Become volunteer
app.put("/api/users/become-volunteer/:id", (req, res) => {
  const { full_name, phone, skills, availability } = req.body;

  const sql = `
    UPDATE users
    SET 
      full_name = ?,
      phone = ?,
      skills = ?,
      availability = ?,
      role = 'volunteer'
    WHERE user_id = ?
  `;

  db.query(sql, [full_name, phone, skills, availability, req.params.id], (err) => {
    if (err) {
      console.error("Volunteer registration error:", err);
      return res.status(500).json({
        success: false,
        message: "Volunteer registration failed",
      });
    }

    res.json({
      success: true,
      message: "Registered as volunteer successfully",
    });
  });
});

// Get all volunteers
app.get("/api/users/volunteers", (req, res) => {
  const sql = `
    SELECT
      user_id,
      full_name,
      email,
      phone,
      city,
      skills,
      availability,
      role
    FROM users
    WHERE role = 'volunteer'
    ORDER BY user_id DESC
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

// Assign task to volunteer
app.post("/api/tasks/assign", (req, res) => {
  const { volunteer_id, title, description } = req.body;

  if (!volunteer_id || !title) {
    return res.status(400).json({
      success: false,
      message: "Volunteer ID and task title are required",
    });
  }

  const sql = `
    INSERT INTO volunteer_tasks
    (volunteer_id, title, description, status)
    VALUES (?, ?, ?, 'Pending')
  `;

  db.query(sql, [volunteer_id, title, description], (err) => {
    if (err) {
      console.error("Task assign error:", err);
      return res.status(500).json({
        success: false,
        message: "Task assign failed",
      });
    }

    res.json({
      success: true,
      message: "Task assigned successfully",
    });
  });
});

// Get volunteer tasks
app.get("/api/tasks/volunteer/:id", (req, res) => {
  const sql = `
    SELECT *
    FROM volunteer_tasks
    WHERE volunteer_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error("Volunteer task fetch error:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch volunteer tasks",
      });
    }

    res.json(result);
  });
});

// Update task status
app.put("/api/tasks/status/:id", (req, res) => {
  const { status } = req.body;

  const sql = `
    UPDATE volunteer_tasks
    SET status = ?
    WHERE task_id = ?
  `;

  db.query(sql, [status, req.params.id], (err) => {
    if (err) {
      console.error("Task status update error:", err);
      return res.status(500).json({
        success: false,
        message: "Task status update failed",
      });
    }

    res.json({
      success: true,
      message: "Task status updated",
    });
  });
});

// Dashboard Stats
app.get("/api/dashboard/stats", (req, res) => {
  const stats = {};

  db.query("SELECT COUNT(*) AS totalAlerts FROM alerts", (err, alerts) => {
    if (err) return res.status(500).json(err);

    stats.alerts = alerts[0].totalAlerts;

    db.query("SELECT COUNT(*) AS totalShelters FROM shelters", (err, shelters) => {
      if (err) return res.status(500).json(err);

      stats.shelters = shelters[0].totalShelters;

      db.query("SELECT COUNT(*) AS totalSOS FROM sos_requests", (err, sos) => {
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
      });
    });
  });
});

// Update SOS status
app.put("/api/sos/status/:id", (req, res) => {
  const { status } = req.body;

  const sql = "UPDATE sos_requests SET status = ? WHERE sos_id = ?";

  db.query(sql, [status, req.params.id], (err) => {
    if (err) {
      console.error("SOS status update error:", err);
      return res.status(500).json({
        success: false,
        message: "Status update failed",
      });
    }

    res.json({
      success: true,
      message: "SOS status updated",
    });
  });
});

// Get all SOS requests
app.get("/api/sos/all", (req, res) => {
  const sql = `
    SELECT
      s.*,
      u.full_name,
      u.email,
      u.phone
    FROM sos_requests s
    LEFT JOIN users u
    ON s.user_id = u.user_id
    ORDER BY s.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Failed to fetch SOS requests",
      });
    }

    res.json(results);
  });
});

// Get user SOS requests
app.get("/api/sos/user/:email", (req, res) => {
  const { email } = req.params;

  db.query(
    "SELECT * FROM sos_requests WHERE email = ? ORDER BY created_at DESC",
    [email],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      res.json(results);
    }
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});