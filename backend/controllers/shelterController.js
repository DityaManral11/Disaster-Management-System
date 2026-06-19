import db from "../config/db.js";

export const getShelters = (req, res) => {
  db.query("SELECT * FROM shelters ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

export const createShelter = (req, res) => {
  const { name, location, capacity, description } = req.body;

  db.query(
    "INSERT INTO shelters (name, location, capacity, description) VALUES (?, ?, ?, ?)",
    [name, location, capacity, description],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ message: "Shelter created successfully" });
    }
  );
};