// src/components/dashboard/Dashboard.tsx
import React from "react";
import { User, Announcement } from "@/types";
import { formatDate } from "@/utils/helpers";
import { Calendar, TrendingUp, Users, Clock, Bell, Star } from "lucide-react";
import EventCalendar from "./EventCalendar";
import EnhancedAnnouncements from "./EnhancedAnnouncements";

interface DashboardProps {
  userData: User;
  announcements: Announcement[];
}

const Dashboard: React.FC<DashboardProps> = ({ userData, announcements }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-16 -translate-y-8">
          <div className="w-40 h-40 bg-white opacity-10 rounded-full"></div>
        </div>
        <div className="absolute bottom-0 right-20 transform translate-y-8">
          <div className="w-24 h-24 bg-white opacity-10 rounded-full"></div>
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">
            Welcome back, {userData.firstname}! 👋
          </h2>
          <p className="text-blue-100 mb-1">
            {userData.school} • Level: Intermediate
          </p>
          {userData.lastlogin && (
            <p className="text-blue-100 text-sm">
              Last login: {formatDate(userData.lastlogin)}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-3">
            <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors duration-200 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              View Timetable
            </button>
            <button className="bg-transparent border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Check Attendance
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Overall Attendance
              </h3>
              <p className="text-3xl font-bold text-green-600">96%</p>
              <p className="text-sm text-green-600 font-medium">
                Excellent standing
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Current GPA
              </h3>
              <p className="text-3xl font-bold text-blue-600">3.4</p>
              <p className="text-sm text-blue-600 font-medium">B+ average</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Classes Today
              </h3>
              <p className="text-3xl font-bold text-purple-600">3</p>
              <p className="text-sm text-purple-600 font-medium">
                Next in 2 hours
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Pending Tasks
              </h3>
              <p className="text-3xl font-bold text-orange-600">2</p>
              <p className="text-sm text-orange-600 font-medium">
                Surveys due soon
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Bell className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Announcements */}
        <div className="lg:col-span-2">
          <EnhancedAnnouncements announcements={announcements} />
        </div>

        {/* Right Column - Event Calendar */}
        <div className="lg:col-span-1">
          <EventCalendar />
        </div>
      </div>

      {/* Today's Classes */}
      <div className="bg-white rounded-lg shadow border border-gray-100">
        <div className="border-b border-gray-200 p-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Today&#39;s Classes
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">
                  English Communication
                </h4>
                <p className="text-sm text-gray-600">
                  Room 301 • Sarah Johnson
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-blue-600">8:30 - 10:30 AM</p>
                <p className="text-sm text-gray-500">In 2 hours</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Academic Writing</h4>
                <p className="text-sm text-gray-600">Room 205 • Michael Chen</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-yellow-600">
                  10:45 AM - 12:45 PM
                </p>
                <p className="text-sm text-gray-500">Later today</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 border-l-4 border-purple-500 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">TOEFL Prep</h4>
                <p className="text-sm text-gray-600">Room 102 • Lisa Wilson</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-purple-600">1:45 - 3:45 PM</p>
                <p className="text-sm text-gray-500">Later today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
