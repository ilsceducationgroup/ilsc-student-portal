// src/hooks/useNavigation.ts - Custom hook for navigation state
import { useState, useCallback } from "react";

export type TabType =
  | "home"
  | "profile"
  | "classes"
  | "requests"
  | "documents"
  | "surveys";

interface UseNavigationReturn {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  toggleNotifications: () => void;
}

export function useNavigation(): UseNavigationReturn {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const toggleNotifications = useCallback(() => {
    setShowNotifications((prev) => !prev);
  }, []);

  // Auto-close mobile menu when tab changes
  const handleSetActiveTab = useCallback((tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  }, []);

  return {
    activeTab,
    setActiveTab: handleSetActiveTab,
    mobileMenuOpen,
    setMobileMenuOpen,
    toggleMobileMenu,
    showNotifications,
    setShowNotifications,
    toggleNotifications,
  };
}
