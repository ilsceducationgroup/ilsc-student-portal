// src/hooks/useUserData.ts - Custom hook for user data management
import { useState, useEffect, useCallback } from "react";
import { UserService } from "@/lib/services";
import { User } from "@/types";

interface UseUserDataReturn {
  userData: User | null;
  loading: boolean;
  error: string | null;
  updateUser: (updatedUser: User) => void;
  refetchUser: () => Promise<void>;
}

export function useUserData(userId: number): UseUserDataReturn {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("🔍 useUserData: Loading user data for ID:", userId);
      const result = await UserService.getUserById(userId);

      if (result.success && result.data) {
        console.log("✅ useUserData: User data loaded successfully");
        setUserData(result.data);
      } else {
        console.error(
          "❌ useUserData: Failed to load user data:",
          result.error
        );
        setError(result.error || "Failed to load user data");
      }
    } catch (err) {
      console.error("💥 useUserData: Exception loading user data:", err);
      setError("Failed to load user data");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Load user data on mount
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Handle user updates (from profile editing, etc.)
  const updateUser = useCallback((updatedUser: User) => {
    console.log(
      "🔄 useUserData: Updating user data:",
      updatedUser.firstname,
      updatedUser.lastname
    );
    setUserData(updatedUser);
  }, []);

  // Refetch user data (useful for refresh after updates)
  const refetchUser = useCallback(async () => {
    await fetchUserData();
  }, [fetchUserData]);

  return {
    userData,
    loading,
    error,
    updateUser,
    refetchUser,
  };
}
