import express from "express";
import { createHome, getAllHomes } from "../controllers/homeController.js";

const router = express.Router();

router.post("/", createHome);   // add home
router.get("/", getAllHomes);   // fetch all homes

export default router;