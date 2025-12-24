import { createClient } from '@supabase/supabase-js';

// User needs to replace these with their actual Supabase credentials
// User needs to replace these with their actual Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
