import { useState, useEffect } from "react";
import { Announcement } from "../types";
import { announcements as mockAnnouncements } from "../data/mockData";

export const useNotifications = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll use the mock data
    try {
      setAnnouncements(mockAnnouncements);
      setLoading(false);
    } catch (err) {
      setError("Failed to load notifications");
      setLoading(false);
    }
  }, []);

  return { announcements, loading, error };
};
