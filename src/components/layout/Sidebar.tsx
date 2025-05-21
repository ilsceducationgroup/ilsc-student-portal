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
} from "lucide-react";
import { SidebarProps } from "@/types";

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="hidden md:block w-64 bg-white dark:bg-dark-card rounded-lg shadow border border-gray-100 dark:border-dark-border h-full">
      <nav className="space-y-1 p-4">
        <button
          className={`${
            activeTab === "home"
              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          } group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full`}
          onClick={() => setActiveTab("home")}
        >
          <Home
            className={`${
              activeTab === "home"
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
            } flex-shrink-0 h-5 w-5 mr-3`}
          />
          Home
        </button>

        <button
          className={`${
            activeTab === "profile"
              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          } group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full`}
          onClick={() => setActiveTab("profile")}
        >
          <User
            className={`${
              activeTab === "profile"
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
            } flex-shrink-0 h-5 w-5 mr-3`}
          />
          Profile
        </button>

        <button
          className={`${
            activeTab === "classes"
              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          } group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full`}
          onClick={() => setActiveTab("classes")}
        >
          <Calendar
            className={`${
              activeTab === "classes"
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
            } flex-shrink-0 h-5 w-5 mr-3`}
          />
          Classes
        </button>

        <button
          className={`${
            activeTab === "requests"
              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          } group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full`}
          onClick={() => setActiveTab("requests")}
        >
          <MessageSquare
            className={`${
              activeTab === "requests"
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
            } flex-shrink-0 h-5 w-5 mr-3`}
          />
          Requests
        </button>

        <button
          className={`${
            activeTab === "documents"
              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          } group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full`}
          onClick={() => setActiveTab("documents")}
        >
          <File
            className={`${
              activeTab === "documents"
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
            } flex-shrink-0 h-5 w-5 mr-3`}
          />
          Documents
        </button>

        <button
          className={`${
            activeTab === "surveys"
              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          } group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full`}
          onClick={() => setActiveTab("surveys")}
        >
          <ClipboardList
            className={`${
              activeTab === "surveys"
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
            } flex-shrink-0 h-5 w-5 mr-3`}
          />
          Surveys
        </button>

        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-dark-border">
          <button className="group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
            <LogOut className="text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 flex-shrink-0 h-5 w-5 mr-3" />
            Sign out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
