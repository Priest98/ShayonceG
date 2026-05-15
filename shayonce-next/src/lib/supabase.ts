import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Prevent crash if env variables are missing during setup
const isConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('https://');

if (!isConfigured) {
  console.warn(
    '⚠️ SUPABASE NOT CONFIGURED: Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.'
  );
}

// We use a "dummy" client if not configured to prevent the "supabaseUrl is required" error
// This allows the public site to still load with static fallback data.
export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder-url.supabase.co', 'placeholder-key');
