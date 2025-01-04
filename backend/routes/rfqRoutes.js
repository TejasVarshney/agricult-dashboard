import express from "express";
import {
  getAllRfqs,
  getActiveRfqsCount,
  getEndedRfqsCount,
  getTotalRfqsCount,
  createRfq,
  deleteRfq,
  getRfqById,
} from "../controllers/rfqController.js";

const router = express.Router();

// Get routes
router.get("/", getAllRfqs);
router.get("/count/active", getActiveRfqsCount);
router.get("/count/ended", getEndedRfqsCount);
router.get("/count/total", getTotalRfqsCount);
router.get("/:id", getRfqById);

// Post routes
router.post("/", createRfq);

// Delete routes
router.delete("/:id", deleteRfq);

export default router; 