import { supabase } from "../config/supabase.js";

// Get all quotes
export const getAllQuotes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("quotes")
      .select("*");

    if (error) throw error;
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get quote by ID
export const getQuoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: "Quote not found" });
    }
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new quote
export const createQuote = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("quotes")
      .insert([req.body])
      .select();

    if (error) throw error;
    res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update quote
export const updateQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("quotes")
      .update(req.body)
      .eq("id", id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Quote not found" });
    }
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete quote
export const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from("quotes")
      .delete()
      .eq("id", id);

    if (error) throw error;
    res.status(200).json({ message: "Quote deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get quotes count
export const getQuotesCount = async (req, res) => {
  try {
    const { count, error } = await supabase
      .from("quotes")
      .select("*", { count: "exact", head: true });

    if (error) throw error;
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get quotes by RFQ ID
export const getQuotesByRfqId = async (req, res) => {
  try {
    const { rfqId } = req.params;
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .eq("rfq_id", rfqId);

    if (error) throw error;
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 