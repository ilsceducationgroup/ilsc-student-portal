// src/lib/services/userService.ts - User-related database operations
import {
  supabase,
  handleSupabaseError,
  handleSupabaseSuccess,
} from "@/lib/supabase/client";
import { User } from "@/types";

export class UserService {
  // Get user by ID with all fields
  static async getUserById(userId: number) {
    try {
      console.log("🔍 UserService: Fetching user with ID:", userId);

      // Get basic user info
      const { data: user, error: userError } = await supabase
        .from("tbluser")
        .select("*")
        .eq("id", userId)
        .single();

      if (userError || !user) {
        return handleSupabaseError(userError, "fetch user");
      }

      console.log("✅ UserService: User found:", user.firstname, user.lastname);

      // Get user custom fields
      const { data: userDataRows, error: dataError } = await supabase
        .from("userdata")
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
        console.error("⚠️ UserService: Error fetching user fields:", dataError);
      }

      // Transform user fields
      const userFields: { [key: string]: string } = {};
      if (userDataRows) {
        userDataRows.forEach((row: any) => {
          const fieldName = row.userfield?.shortname;
          if (fieldName) {
            userFields[fieldName] = row.extdata || row.data || "";
          }
        });
      }

      const result = {
        ...user,
        userFields,
      };

      return handleSupabaseSuccess(result, "fetch user with fields");
    } catch (error) {
      return handleSupabaseError(error, "fetch user");
    }
  }

  // Update user profile
  static async updateProfile(
    userId: number,
    updates: {
      firstname?: string;
      lastname?: string;
      phone?: string;
      address?: string;
      email?: string;
    }
  ) {
    try {
      console.log("🔄 UserService: Updating profile for user:", userId);

      const { data, error } = await supabase
        .from("tbluser")
        .update({
          ...updates,
          timemodified: new Date().toISOString(),
        })
        .eq("id", userId)
        .select()
        .single();

      if (error) {
        return handleSupabaseError(error, "update profile");
      }

      return handleSupabaseSuccess(data, "update profile");
    } catch (error) {
      return handleSupabaseError(error, "update profile");
    }
  }

  // Update last login
  static async updateLastLogin(userId: number) {
    try {
      console.log("🔄 UserService: Updating last login for user:", userId);

      const { error } = await supabase
        .from("tbluser")
        .update({
          lastlogin: new Date().toISOString(),
          timemodified: new Date().toISOString(),
        })
        .eq("id", userId);

      if (error) {
        return handleSupabaseError(error, "update last login");
      }

      return handleSupabaseSuccess(null, "update last login");
    } catch (error) {
      return handleSupabaseError(error, "update last login");
    }
  }

  // Get user by email
  static async getUserByEmail(email: string) {
    try {
      console.log("🔍 UserService: Fetching user by email:", email);

      const { data: user, error } = await supabase
        .from("tbluser")
        .select("*")
        .eq("email", email)
        .single();

      if (error || !user) {
        return handleSupabaseError(error, "fetch user by email");
      }

      return this.getUserById(user.id);
    } catch (error) {
      return handleSupabaseError(error, "fetch user by email");
    }
  }

  // Get all users (for admin features later)
  static async getAllUsers() {
    try {
      console.log("🔍 UserService: Fetching all users...");

      const { data: users, error } = await supabase
        .from("tbluser")
        .select("*")
        .order("lastname", { ascending: true });

      if (error) {
        return handleSupabaseError(error, "fetch all users");
      }

      return handleSupabaseSuccess(users || [], "fetch all users");
    } catch (error) {
      return handleSupabaseError(error, "fetch all users");
    }
  }
}
