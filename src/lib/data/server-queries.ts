// lib/data/server-queries.ts
import { createClient } from "@/utils/supabase/server";
import { User } from "@/types";

export async function getUserById(userId: number): Promise<User | null> {
  const supabase = await createClient();

  try {
    // Get user basic info (lowercase table name)
    const { data: user, error: userError } = await supabase
      .from("tbluser") // Changed to lowercase
      .select("*")
      .eq("id", userId)
      .single();

    if (userError || !user) {
      console.error("Error fetching user:", userError);
      return null;
    }

    // Get user custom fields data (lowercase table names)
    const { data: userDataRows, error: dataError } = await supabase
      .from("userdata") // Changed to lowercase
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
        const fieldName = row.userfield?.shortname; // Changed to lowercase
        if (fieldName) {
          userFields[fieldName] = row.extdata || row.data || "";
        }
      });
    }

    return {
      ...user,
      userFields,
    };
  } catch (error) {
    console.error("Unexpected error in getUserById:", error);
    return null;
  }
}

export async function getAllUsers(): Promise<User[]> {
  const supabase = await createClient();

  try {
    const { data: users, error } = await supabase
      .from("tbluser") // Changed to lowercase
      .select("*")
      .order("lastname", { ascending: true });

    if (error) {
      console.error("Error fetching all users:", error);
      return [];
    }

    return users || [];
  } catch (error) {
    console.error("Unexpected error in getAllUsers:", error);
    return [];
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const supabase = await createClient();

  try {
    const { data: user, error } = await supabase
      .from("tbluser") // Changed to lowercase
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return null;
    }

    return getUserById(user.id);
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    return null;
  }
}

export async function testConnection() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("tbluser") // Changed to lowercase
      .select("id, firstname, lastname, email, school")
      .limit(3);

    return {
      success: !error,
      data,
      error: error?.message || null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: `Exception: ${error}`,
    };
  }
}
