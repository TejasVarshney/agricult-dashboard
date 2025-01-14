import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || "https://xdiixicngjbpwkmfswli.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkaWl4aWNuZ2picHdrbWZzd2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3MTM2NzMsImV4cCI6MjA1MDI4OTY3M30.Hjki2JZ8n42FqOIFGOv6k-3kzeFtU-z9wT-RYcYKnf0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY); 