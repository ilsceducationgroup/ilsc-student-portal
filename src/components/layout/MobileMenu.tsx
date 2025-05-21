// components/layout/MobileMenu.tsx
"use client";

import React from "react";
import {
  Home,
  User,
  Calendar,
  MessageSquare,
  File,
  ClipboardList,
  LogOut,
  Bell,
} from "lucide-react";
import { MobileMenuProps } from "@/types";
import { getInitials } from "@/utils/helpers";

const MobileMenu: React.FC<MobileMenuProps> = ({
  activeTab,
  setActiveTab,
  mobileMenuOpen,
  setMobileMenuOpen,
  userData,
}) => {
  if (!mobileMenuOpen) return null;

  return (
    <div className="md:hidden bg-white dark:bg-dark-card shadow-lg">
      <div className="pt-2 pb-3 space-y-1">
        <button
          className={`${
            activeTab === "home"
              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          } block pl-3 pr-4 py-2 text-base font-medium w-full text-left`}
          onClick={() => {
            setActiveTab("home");
            setMobileMenuOpen(false);
          }}
        >
          <div className="flex items-center">
            <Home className="h-5 w-5 mr-3" />
            Home
          </div>
        </button>

        <button
          className={`${
            activeTab === "profile"
              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          } block pl-3 pr-4 py-2 text-base font-medium w-full text-left`}
          onClick={() => {
            setActiveTab("profile");
            setMobileMenuOpen(false);
          }}
        >
          <div className="flex items-center">
            <User className="h-5 w-5 mr-3" />
            Profile
          </div>
        </button>

        <button
          className={`${
            activeTab === "classes"
              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          } block pl-3 pr-4 py-2 text-base font-medium w-full text-left`}
          onClick={() => {
            setActiveTab("classes");
            setMobileMenuOpen(false);
          }}
        >
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-3" />
            Classes
          </div>
        </button>

        <button
          className={`${
            activeTab === "requests"
              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          } block pl-3 pr-4 py-2 text-base font-medium w-full text-left`}
          onClick={() => {
            setActiveTab("requests");
            setMobileMenuOpen(false);
          }}
        >
          <div className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-3" />
            Requests
          </div>
        </button>

        <button
          className={`${
            activeTab === "documents"
              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          } block pl-3 pr-4 py-2 text-base font-medium w-full text-left`}
          onClick={() => {
            setActiveTab("documents");
            setMobileMenuOpen(false);
          }}
        >
          <div className="flex items-center">
            <File className="h-5 w-5 mr-3" />
            Documents
          </div>
        </button>

        <button
          className={`${
            activeTab === "surveys"
              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          } block pl-3 pr-4 py-2 text-base font-medium w-full text-left`}
          onClick={() => {
            setActiveTab("surveys");
            setMobileMenuOpen(false);
          }}
        >
          <div className="flex items-center">
            <ClipboardList className="h-5 w-5 mr-3" />
            Surveys
          </div>
        </button>

        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-dark-border">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <span className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">
                {getInitials(userData.firstname, userData.lastname)}
              </span>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800 dark:text-gray-100">
                {userData.firstname} {userData.lastname}
              </div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {userData.email}
              </div>
            </div>
            <button className="ml-auto p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <Bell className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-3 space-y-1">
            <button className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 w-full text-left">
              <div className="flex items-center">
                <LogOut className="h-5 w-5 mr-3" />
                Sign out
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
