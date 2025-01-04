import { supabase } from "../config/supabase.js";

// Get all RFQs
export const getAllRfqs = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("rfqs")
      .select("*");

    if (error) throw error;
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get count of active RFQs
export const getActiveRfqsCount = async (req, res) => {
  try {
    const { count, error } = await supabase
      .from("rfqs")
      .select("*", { count: "exact", head: true })
      .eq("status", true);

    if (error) throw error;
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get count of ended RFQs
export const getEndedRfqsCount = async (req, res) => {
  try {
    const { count, error } = await supabase
      .from("rfqs")
      .select("*", { count: "exact", head: true })
      .eq("status", false);

    if (error) throw error;
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get total count of RFQs
export const getTotalRfqsCount = async (req, res) => {
  try {
    const { count, error } = await supabase
      .from("rfqs")
      .select("*", { count: "exact", head: true });

    if (error) throw error;
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new RFQ
export const createRfq = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("rfqs")
      .insert([req.body])
      .select();

    if (error) throw error;
    res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete RFQ
export const deleteRfq = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from("rfqs")
      .delete()
      .eq("id", id);

    if (error) throw error;
    res.status(200).json({ message: "RFQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 