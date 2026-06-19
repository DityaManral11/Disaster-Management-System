import express from "express";
import {
createSOS,
getAllSOS,
updateSOSStatus,
} from "../controllers/sosController.js";

const router = express.Router();

router.post("/create", createSOS);
router.get("/all", getAllSOS);
router.put("/:id/status", updateSOSStatus);

export default router;
