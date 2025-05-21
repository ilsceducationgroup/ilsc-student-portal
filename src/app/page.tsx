"use client";

import React, { useState } from "react";
import Header from "../app/components/layout/Header";
import Sidebar from "../app/components/layout/Sidebar";
import MobileMenu from "../app/components/layout/MobileMenu";
import Dashboard from "../app/components/dashboard/Dashboard";
import Profile from "../app/components/profile/StudentProfile";
import Classes from "../app/components/classes/ClassInformation";
import Requests from "../app/components/requests/ServiceRequestList";
import Documents from "../app/components/documents/DocumentList";
import Surveys from "../app/components/surveys/SurveyList";
import {
  userData,
  announcements,
  serviceRequests,
  documents,
  surveys,
} from "../../data/mockData";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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
