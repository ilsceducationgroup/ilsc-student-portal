// src/lib/services/connectionService.ts - Database connection testing
import {
  supabase,
  handleSupabaseError,
  handleSupabaseSuccess,
} from "@/lib/supabase/client";

export class ConnectionService {
  // Test basic database connection
  static async testConnection() {
    try {
      console.log("🔍 ConnectionService: Testing database connection...");
      console.log(
        "🔧 URL:",
        process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + "..."
      );

      const { data, error } = await supabase
        .from("tbluser")
        .select("id, firstname, lastname, email, school")
        .limit(3);

      if (error) {
        return handleSupabaseError(error, "test connection");
      }

      console.log("✅ ConnectionService: Found", data?.length, "users");
      return handleSupabaseSuccess(data, "test connection");
    } catch (error) {
      return handleSupabaseError(error, "test connection");
    }
  }

  // Test basic query
  static async testBasicQuery() {
    try {
      console.log("🔍 ConnectionService: Running basic query test...");

      const { data, error } = await supabase
        .from("tbluser")
        .select("id, firstname, lastname")
        .limit(1);

      if (error) {
        return handleSupabaseError(error, "basic query test");
      }

      return handleSupabaseSuccess(data, "basic query test");
    } catch (error) {
      return handleSupabaseError(error, "basic query test");
    }
  }

  // Test user with fields (comprehensive test)
  static async testUserWithFields(userId: number = 1) {
    try {
      console.log(
        "🔍 ConnectionService: Testing user with fields for ID:",
        userId
      );

      // This uses the UserService to test the full functionality
      const { UserService } = await import("./userService");
      return await UserService.getUserById(userId);
    } catch (error) {
      return handleSupabaseError(error, "test user with fields");
    }
  }
}
