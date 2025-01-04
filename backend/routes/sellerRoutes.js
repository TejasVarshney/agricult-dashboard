import express from "express";
import { getSellersCount, getAllSellers } from "../controllers/sellerController.js";

const router = express.Router();

router.get("/count", getSellersCount);
router.get("/", getAllSellers);

export default router; 