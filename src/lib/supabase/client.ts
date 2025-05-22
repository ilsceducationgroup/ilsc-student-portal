// src/lib/supabase/client.ts - Base client and helper functions for Supabase
import { createClient } from "@supabase/supabase-js";

// Create a single instance to be shared across all modules
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Helper function for consistent error handling
export function handleSupabaseError(error: any, operation: string) {
  console.error(`❌ Error during ${operation}:`, error);
  return {
    success: false,
    error: error?.message || `Failed to ${operation}`,
    data: null,
  };
}

// Helper function for successful responses
export function handleSupabaseSuccess(data: any, operation: string) {
  console.log(`✅ ${operation} successful:`, data);
  return {
    success: true,
    error: null,
    data,
  };
}
