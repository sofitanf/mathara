import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://gzpujvbthcgzlnxydgfw.supabase.co";
const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6cHVqdmJ0aGNnemxueHlkZ2Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4NzMwOTUsImV4cCI6MjA5MzQ0OTA5NX0.-j9dZaANlvu0mFnWTu4PfKnDTnv5OiGn7e8Ed5CMtvw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
