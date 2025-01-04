import express from "express";
import { getBuyersCount, getAllBuyers } from "../controllers/buyerController.js";

const router = express.Router();

router.get("/count", getBuyersCount);
router.get("/", getAllBuyers);

export default router; 