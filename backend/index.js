import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = "https://pojuqqnftsunpiutlyrn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvanVxcW5mdHN1bnBpdXRseXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2ODAwOTIsImV4cCI6MjA1MDI1NjA5Mn0.0QASIiNcOib_pClL7XMi45_MoK3cMNjLbmvfhp982UQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const app = express();
const port = 1234;

app.use(cors());
app.use(express.json());

app.get("/buyers/count", async (req, res) => {
  try {
    const { count, error } = await supabase
      .from("USER_BUYERS")
      .select("*", { count: "exact", head: true });

    if (error) throw error;
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/sellers/count", async (req, res) => {
  try {
    const { count, error } = await supabase
      .from("USER_SELLER")
      .select("*", { count: "exact", head: true });

    if (error) throw error;
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/orders/active/count", async (req, res) => {
  try {
    const { count, error } = await supabase
      .from("ORDERS")
      .select("*", { count: "exact", head: true })
      .eq("status", true);

    if (error) throw error;
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/orders/past/count", async (req, res) => {
  try {
    const { count, error } = await supabase
      .from("ORDERS")
      .select("*", { count: "exact", head: true })
      .eq("status", false);

    if (error) throw error;
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/orders/active", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("ORDERS")
      .select("*")
      .eq("status", true);

    if (error) throw error;
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/orders/past", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("ORDERS")
      .select("*")
      .eq("status", false);

    if (error) throw error;
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
