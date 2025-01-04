import express from "express";
import {
  getAllQuotes,
  getQuoteById,
  createQuote,
  updateQuote,
  deleteQuote,
  getQuotesCount,
  getQuotesByRfqId
} from "../controllers/quoteController.js";

const router = express.Router();

// Get routes
router.get("/", getAllQuotes);
router.get("/count", getQuotesCount);
router.get("/:id", getQuoteById);
router.get("/rfq/:rfqId", getQuotesByRfqId);

// Post routes
router.post("/", createQuote);

// Put routes
router.put("/:id", updateQuote);

// Delete routes
router.delete("/:id", deleteQuote);

export default router; 