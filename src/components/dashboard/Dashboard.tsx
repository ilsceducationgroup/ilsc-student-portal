"use client";

import React from "react";
import { User, Announcement } from "@/types";
import { formatDate } from "@/utils/helpers";

interface DashboardProps {
  userData: User;
  announcements: Announcement[];
}

const Dashboard: React.FC<DashboardProps> = ({ userData, announcements }) => {
  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold">
          Welcome back, {userData.firstname}!
        </h2>
        <p className="mt-2">
          Last login: {formatDate(userData.lastlogin || "")}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="bg-white text-blue-600 dark:bg-white/90 dark:text-blue-700 px-4 py-2 rounded-md font-medium hover:bg-blue-50 dark:hover:bg-white/100">
            View Timetable
          </button>
          <button className="bg-transparent border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700/50 dark:hover:bg-blue-800/50">
            Check Attendance
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-dark-card p-4 rounded-lg shadow border border-gray-100 dark:border-dark-border">
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text">
            Overall Attendance
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
            96%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Excellent standing
          </p>
        </div>

        <div className="bg-white dark:bg-dark-card p-4 rounded-lg shadow border border-gray-100 dark:border-dark-border">
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text">
            Current GPA
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
            3.4
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            B+ average
          </p>
        </div>

        <div className="bg-white dark:bg-dark-card p-4 rounded-lg shadow border border-gray-100 dark:border-dark-border sm:col-span-2 lg:col-span-1">
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text">
            Pending Tasks
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
            2
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Surveys due soon
          </p>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-white dark:bg-dark-card rounded-lg shadow border border-gray-100 dark:border-dark-border">
        <div className="border-b border-gray-200 dark:border-dark-border p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text">
            Recent Announcements
          </h3>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                announcement.important ? "border-l-4 border-l-red-500" : ""
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start">
                <h4 className="font-medium text-gray-900 dark:text-dark-text">
                  {announcement.title}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                  {announcement.date}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {announcement.content}
              </p>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 text-center">
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
            View All Announcements
          </button>
        </div>
      </div>

      {/* Today's Classes */}
      <div className="bg-white dark:bg-dark-card rounded-lg shadow border border-gray-100 dark:border-dark-border">
        <div className="border-b border-gray-200 dark:border-dark-border p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text">
            Todays Classes
          </h3>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-dark-text">
                  English Communication
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Room 301 • Sarah Johnson
                </p>
              </div>
              <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full mt-2 sm:mt-0">
                8:30 - 10:30 AM
              </span>
            </div>
          </div>
          <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-dark-text">
                  Academic Writing
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Room 205 • Michael Chen
                </p>
              </div>
              <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full mt-2 sm:mt-0">
                10:45 - 12:45 PM
              </span>
            </div>
          </div>
          <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-dark-text">
                  TOEFL Prep
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Room 102 • Lisa Wilson
                </p>
              </div>
              <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full mt-2 sm:mt-0">
                1:45 - 3:45 PM
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 text-center">
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
            View Full Timetable
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
