"use client";

import React from "react";
import { Bell, Menu, X, ChevronDown } from "lucide-react";
import { HeaderProps } from "@/types";
import NotificationsMenu from "./NotificationsMenu";
import ThemeToggle from "@/components/common/ThemeToggle";
import { getInitials } from "@/utils/helpers";
import { announcements } from "@/data/mockData";

const Header: React.FC<HeaderProps> = ({
  userData,
  showNotifications,
  setShowNotifications,
  mobileMenuOpen,
  toggleMobileMenu,
}) => {
  return (
    <header className="bg-white dark:bg-dark-card shadow dark:shadow-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">
                ILSC Student Portal
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />

            <div className="relative">
              <button
                className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-dark-card"></span>
              </button>
              {showNotifications && (
                <NotificationsMenu announcements={announcements} />
              )}
            </div>

            <div className="flex items-center ml-3">
              <div>
                <button className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">
                    {getInitials(userData.firstname, userData.lastname)}
                  </span>
                  <span className="ml-2 font-medium text-gray-700 dark:text-gray-200">
                    {userData.firstname} {userData.lastname}
                  </span>
                  <ChevronDown className="ml-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
