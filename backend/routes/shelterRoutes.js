import express from "express";
import { getShelters, createShelter } from "../controllers/shelterController.js";

const router = express.Router();

router.get("/", getShelters);
router.post("/", createShelter);

export default router;