import { supabase } from "../config/supabase.js";

export const getSellersCount = async (req, res) => {
  try {
    const { count, error } = await supabase
      .from("seller_profiles")
      .select("*", { count: "exact", head: true });

    if (error) throw error;
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllSellers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("seller_profiles")
      .select("*");

    if (error) throw error;
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 