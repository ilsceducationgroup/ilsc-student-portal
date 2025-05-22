// lib/data/client-queries.ts
import { createClient } from "@/utils/supabase/client";
import { User } from "@/types";

export async function getUserByIdClient(userId: number): Promise<User | null> {
  const supabase = createClient();

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
    console.error("Unexpected error in getUserByIdClient:", error);
    return null;
  }
}

export async function updateUserLastLogin(userId: number): Promise<boolean> {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("tbluser") // Changed to lowercase
      .update({
        lastlogin: new Date().toISOString(),
        timemodified: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) {
      console.error("Error updating last login:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Unexpected error in updateUserLastLogin:", error);
    return false;
  }
}
