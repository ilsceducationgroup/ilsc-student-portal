// components/layout/Sidebar.tsx
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
    <div className="hidden md:block w-64 bg-white rounded-lg shadow border border-gray-100 h-full">
      <nav className="space-y-1 p-4">
        <button
          className={`${
            activeTab === "home"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          } group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full`}
          onClick={() => setActiveTab("home")}
        >
          <Home
            className={`${
              activeTab === "home"
                ? "text-blue-600"
                : "text-gray-400 group-hover:text-gray-500"
            } flex-shrink-0 h-5 w-5 mr-3`}
          />
          Home
        </button>

        <button
          className={`${
            activeTab === "profile"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          } group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full`}
          onClick={() => setActiveTab("profile")}
        >
          <User
            className={`${
              activeTab === "profile"
                ? "text-blue-600"
                : "text-gray-400 group-hover:text-gray-500"
            } flex-shrink-0 h-5 w-5 mr-3`}
          />
          Profile
        </button>

        <button
          className={`${
            activeTab === "classes"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          } group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full`}
          onClick={() => setActiveTab("classes")}
        >
          <Calendar
            className={`${
              activeTab === "classes"
                ? "text-blue-600"
                : "text-gray-400 group-hover:text-gray-500"
            } flex-shrink-0 h-5 w-5 mr-3`}
          />
          Classes
        </button>

        <button
          className={`${
            activeTab === "requests"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          } group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full`}
          onClick={() => setActiveTab("requests")}
        >
          <MessageSquare
            className={`${
              activeTab === "requests"
                ? "text-blue-600"
                : "text-gray-400 group-hover:text-gray-500"
            } flex-shrink-0 h-5 w-5 mr-3`}
          />
          Requests
        </button>

        <button
          className={`${
            activeTab === "documents"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          } group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full`}
          onClick={() => setActiveTab("documents")}
        >
          <File
            className={`${
              activeTab === "documents"
                ? "text-blue-600"
                : "text-gray-400 group-hover:text-gray-500"
            } flex-shrink-0 h-5 w-5 mr-3`}
          />
          Documents
        </button>

        <button
          className={`${
            activeTab === "surveys"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          } group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full`}
          onClick={() => setActiveTab("surveys")}
        >
          <ClipboardList
            className={`${
              activeTab === "surveys"
                ? "text-blue-600"
                : "text-gray-400 group-hover:text-gray-500"
            } flex-shrink-0 h-5 w-5 mr-3`}
          />
          Surveys
        </button>

        <div className="pt-4 mt-4 border-t border-gray-200">
          <button className="group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-gray-600 hover:bg-gray-50">
            <LogOut className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 h-5 w-5 mr-3" />
            Sign out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
