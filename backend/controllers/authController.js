import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }

        if (results.length > 0) {
          return res.status(400).json({
            message: "User already exists",
          });
        }

        const hashedPassword = await bcrypt.hash(
          password,
          10
        );

        db.query(
          `INSERT INTO users
          (full_name, email, password_hash, role)
          VALUES (?, ?, ?, ?)`,
          [
            full_name,
            email,
            hashedPassword,
            role || "citizen",
          ],
          (err) => {
            if (err) {
              return res.status(500).json({
                message: err.message,
              });
            }

            res.status(201).json({
              message:
                "User registered successfully",
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// LOGIN
export const login = (req, res) => {
  try {
    const { email, password } = req.body;

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }

        if (results.length === 0) {
          return res.status(400).json({
            message:
              "Invalid Email or Password",
          });
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(
          password,
          user.password_hash
        );

        if (!isMatch) {
          return res.status(400).json({
            message:
              "Invalid Email or Password",
          });
        }

        const token = jwt.sign(
          {
            user_id: user.user_id,
            email: user.email,
            role: user.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

        res.status(200).json({
          message: "Login Successful",
          token,
          user: {
            user_id: user.user_id,
            full_name: user.full_name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            city: user.city,
            blood_group: user.blood_group,
            availability: user.availability,
            emergency_contact: user.emergency_contact,
            skills: user.skills,
          },
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};