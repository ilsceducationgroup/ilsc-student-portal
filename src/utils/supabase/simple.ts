// utils/supabase/simple.ts
import { createClient } from "@supabase/supabase-js";

// Create a simple client for testing
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Test function with correct table names (lowercase)
export async function testSimpleConnection() {
  console.log("Testing with URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log(
    "Testing with Key (first 20 chars):",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20)
  );

  try {
    const { data, error } = await supabase
      .from("tbluser") // Changed to lowercase
      .select("id, firstname, lastname")
      .limit(1);

    console.log("Query result:", { data, error });

    return {
      success: !error,
      data,
      error: error?.message || null,
    };
  } catch (err) {
    console.error("Exception:", err);
    return {
      success: false,
      data: null,
      error: `Exception: ${err}`,
    };
  }
}

// Test getting user with fields
export async function testUserWithFields(userId: number = 1) {
  try {
    // Get user basic info
    const { data: user, error: userError } = await supabase
      .from("tbluser") // lowercase
      .select("*")
      .eq("id", userId)
      .single();

    if (userError || !user) {
      return {
        success: false,
        data: null,
        error: userError?.message || "User not found",
      };
    }

    // Get user fields data
    const { data: userDataRows, error: dataError } = await supabase
      .from("userdata") // lowercase
      .select(
        `
        fieldid,
        data,
        extdata,
        userfield!inner (
          shortname,
          name
        )
      `
      )
      .eq("userid", userId);

    if (dataError) {
      console.error("Error fetching user data:", dataError);
    }

    // Transform user data into userFields object
    const userFields: { [key: string]: string } = {};
    if (userDataRows) {
      userDataRows.forEach((row: any) => {
        const fieldName = row.userfield?.shortname;
        if (fieldName) {
          userFields[fieldName] = row.extdata || row.data || "";
        }
      });
    }

    return {
      success: true,
      data: {
        ...user,
        userFields,
      },
      error: null,
    };
  } catch (err) {
    console.error("Exception:", err);
    return {
      success: false,
      data: null,
      error: `Exception: ${err}`,
    };
  }
}
