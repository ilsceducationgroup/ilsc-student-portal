// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileMenu from "@/components/layout/MobileMenu";
import Dashboard from "@/components/dashboard/Dashboard";
import Profile from "@/components/profile/StudentProfile";
import Classes from "@/components/classes/ClassInformation";
import Requests from "@/components/requests/ServiceRequestList";
import Documents from "@/components/documents/DocumentList";
import Surveys from "@/components/surveys/SurveyList";
import { testUserWithFields } from "@/utils/supabase/simple";
import {
  announcements,
  serviceRequests,
  documents,
  surveys,
} from "@/data/mockData";
import { User } from "@/types";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user data on component mount
  useEffect(() => {
    async function loadUserData() {
      try {
        setLoading(true);
        setError(null);

        console.log("🔍 Loading user data...");
        const result = await testUserWithFields(1); // John Smith's data

        if (result.success && result.data) {
          console.log(
            "✅ User data loaded successfully:",
            result.data.firstname,
            result.data.lastname
          );
          setUserData(result.data);
        } else {
          console.error("❌ Failed to load user data:", result.error);
          setError(result.error || "Failed to load user data");
        }
      } catch (err) {
        console.error("💥 Exception loading user data:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading student portal...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
            <h3 className="font-bold">Error Loading Student Portal</h3>
            <p>{error || "Failed to load user data"}</p>
            <p className="text-sm mt-2">
              Check that your database connection is working.
            </p>
          </div>
          <div className="mt-4 space-x-2">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Retry
            </button>
            <a
              href="/simple-test"
              className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Test Connection
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Render appropriate content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Dashboard userData={userData} announcements={announcements} />;
      case "profile":
        return <Profile userData={userData} />;
      case "classes":
        return <Classes userData={userData} />;
      case "requests":
        return <Requests serviceRequests={serviceRequests} />;
      case "documents":
        return <Documents documents={documents} />;
      case "surveys":
        return <Surveys surveys={surveys} />;
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Select a menu item
            </h3>
            <p className="text-gray-600">
              Please select an option from the menu to view content.
            </p>
          </div>
        );
    }
  };

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
          <div className="flex-1 mt-6 md:mt-0">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
