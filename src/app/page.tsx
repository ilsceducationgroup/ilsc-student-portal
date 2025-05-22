// src/app/page.tsx
"use client";

import React from "react";
import { useUserData } from "@/hooks/useUserData";
import { useNavigation } from "@/hooks/useNavigation";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorDisplay } from "@/components/common/ErrorDisplay";
import { ContentRouter } from "@/components/layout/ContentRouter";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileMenu from "@/components/layout/MobileMenu";

export default function Home() {
  // Custom hooks for state management
  const { userData, loading, error, updateUser } = useUserData(1); // John Smith's ID
  const {
    activeTab,
    setActiveTab,
    mobileMenuOpen,
    setMobileMenuOpen,
    toggleMobileMenu,
    showNotifications,
    setShowNotifications,
  } = useNavigation();

  // Handle loading state
  if (loading) {
    return <LoadingSpinner message="Loading student portal..." />;
  }

  // Handle error state
  if (error || !userData) {
    return (
      <ErrorDisplay
        error={error || "Failed to load user data"}
        onRetry={() => window.location.reload()}
      />
    );
  }

  // Main application layout
  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        userData={userData}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />

      <MobileMenu
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        userData={userData}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:space-x-6">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 mt-6 md:mt-0">
            <ContentRouter
              activeTab={activeTab}
              userData={userData}
              onUserUpdate={updateUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
