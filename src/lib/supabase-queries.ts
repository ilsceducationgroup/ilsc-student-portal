// src/lib/supabase-queries.ts
import { supabase } from "@/utils/supabase/client";
import { User } from "@/types";

export async function getUserById(userId: number): Promise<User | null> {
  try {
    console.log("🔍 Fetching user with ID:", userId);

    // First, let's try a very simple query to test the connection
    const { data: user, error: userError } = await supabase
      .from("tblUser")
      .select("*")
      .eq("id", userId)
      .single();

    console.log("📊 User query result:", { user, error: userError });

    if (userError) {
      console.error("❌ Error fetching user:", userError);
      return null;
    }

    if (!user) {
      console.log("⚠️ No user found with ID:", userId);
      return null;
    }

    console.log("✅ User found:", user.firstname, user.lastname);

    // Now try to get user fields - let's do this separately to debug
    console.log("🔍 Fetching user fields for user ID:", userId);

    const { data: userDataRows, error: dataError } = await supabase
      .from("UserData")
      .select(
        `
        fieldid,
        data,
        extdata,
        UserField!inner (
          shortname,
          name
        )
      `
      )
      .eq("userid", userId);

    console.log("📊 User data query result:", {
      userDataRows,
      error: dataError,
    });

    if (dataError) {
      console.error("❌ Error fetching user data:", dataError);
      // Don't return null here, just continue without user fields
    }

    // Transform user data into userFields object
    const userFields: { [key: string]: string } = {};
    if (userDataRows && userDataRows.length > 0) {
      console.log("🔄 Processing user fields...");
      userDataRows.forEach((row: any) => {
        const fieldName = row.UserField?.shortname;
        if (fieldName) {
          userFields[fieldName] = row.extdata || row.data || "";
          console.log(`✅ Added field: ${fieldName}`);
        }
      });
    } else {
      console.log("⚠️ No user fields found");
    }

    const result = {
      ...user,
      userFields,
    };

    console.log("✅ Final user object prepared");
    return result;
  } catch (error) {
    console.error("💥 Unexpected error in getUserById:", error);
    return null;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    console.log("🔍 Fetching user by email:", email);

    const { data: user, error } = await supabase
      .from("tblUser")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      console.log("❌ User not found by email:", email);
      return null;
    }

    return getUserById(user.id);
  } catch (error) {
    console.error("💥 Error in getUserByEmail:", error);
    return null;
  }
}

export async function getUserByIdNumber(
  idnumber: string
): Promise<User | null> {
  try {
    console.log("🔍 Fetching user by ID number:", idnumber);

    const { data: user, error } = await supabase
      .from("tblUser")
      .select("*")
      .eq("idnumber", idnumber)
      .single();

    if (error || !user) {
      console.log("❌ User not found by ID number:", idnumber);
      return null;
    }

    return getUserById(user.id);
  } catch (error) {
    console.error("💥 Error in getUserByIdNumber:", error);
    return null;
  }
}

export async function updateUserLastLogin(userId: number): Promise<boolean> {
  try {
    console.log("🔄 Updating last login for user:", userId);

    const { error } = await supabase
      .from("tblUser")
      .update({
        lastlogin: new Date().toISOString(),
        timemodified: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) {
      console.error("❌ Error updating last login:", error);
      return false;
    }

    console.log("✅ Last login updated successfully");
    return true;
  } catch (error) {
    console.error("💥 Unexpected error in updateUserLastLogin:", error);
    return false;
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    console.log("🔍 Fetching all users...");

    const { data: users, error } = await supabase
      .from("tblUser")
      .select("*")
      .order("lastname", { ascending: true });

    if (error) {
      console.error("❌ Error fetching all users:", error);
      return [];
    }

    console.log(`✅ Found ${users?.length || 0} users`);
    return users || [];
  } catch (error) {
    console.error("💥 Unexpected error in getAllUsers:", error);
    return [];
  }
}

// Test connection function with more detailed logging
export async function testConnection(): Promise<{
  success: boolean;
  message: string;
  data?: any;
}> {
  try {
    console.log("🔍 Testing Supabase connection...");
    console.log(
      "🔧 URL:",
      process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + "..."
    );
    console.log(
      "🔧 Key:",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 30) + "..."
    );

    const { data, error } = await supabase
      .from("tblUser")
      .select("id, firstname, lastname, email, school")
      .limit(3);

    if (error) {
      console.error("❌ Connection test failed:", error);
      return {
        success: false,
        message: `Database error: ${error.message}`,
      };
    }

    console.log("✅ Connection test successful, found", data?.length, "users");
    return {
      success: true,
      message: "Successfully connected to Supabase!",
      data,
    };
  } catch (error) {
    console.error("💥 Connection test exception:", error);
    return {
      success: false,
      message: `Connection error: ${error}`,
    };
  }
}

// Simple function to test basic queries
export async function testBasicQuery(): Promise<any> {
  try {
    console.log("🔍 Running basic query test...");

    const { data, error } = await supabase
      .from("tblUser")
      .select("id, firstname, lastname")
      .limit(1);

    console.log("📊 Basic query result:", { data, error });

    return { data, error, success: !error };
  } catch (error) {
    console.error("💥 Basic query exception:", error);
    return { data: null, error: error, success: false };
  }
}
