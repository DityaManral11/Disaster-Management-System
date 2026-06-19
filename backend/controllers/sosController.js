import db from "../config/db.js";

export const createSOS = async (req, res) => {
  try {
    const {
      user_id,
      emergency_type,
      latitude,
      longitude,
      description,
    } = req.body;

    
db.query(
  `INSERT INTO sos_requests
      (user_id, emergency_type, latitude, longitude, description)
    VALUES(?, ?, ?, ?, ?)`,
  [
    user_id,
    emergency_type,
    latitude,
    longitude,
    description,
  ],
  (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "SOS Request Created",
      sos_id: result.insertId,
    });
  }
);


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllSOS = (req, res) => {
  db.query(
    `SELECT
      s.*,
      u.full_name,
      u.email
     FROM sos_requests s
     JOIN users u
     ON s.user_id = u.user_id
     ORDER BY s.created_at DESC`,
    (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      
  res.json(results);
}


);
};

export const updateSOSStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.query(
    `UPDATE sos_requests
     SET status = ?
     WHERE sos_id = ?`,
    [status, id],
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      
  res.json({
    success: true,
    message: "SOS Status Updated",
  });
}


);
};
