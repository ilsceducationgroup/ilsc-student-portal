import React from "react";
import { User, Announcement } from "../../../../types";
interface DashboardProps {
  userData: User;
  announcements: Announcement[];
}

const Dashboard: React.FC<DashboardProps> = ({ userData, announcements }) => {
  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold">
          Welcome back, {userData.firstname}!
        </h2>
        <p className="mt-2">
          Last login: {new Date(userData.lastlogin || "").toLocaleString()}
        </p>
        <div className="mt-4 flex space-x-2">
          <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50">
            View Timetable
          </button>
          <button className="bg-transparent border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700">
            Check Attendance
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900">
            Overall Attendance
          </h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">96%</p>
          <p className="text-sm text-gray-500 mt-1">Excellent standing</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900">Current GPA</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">3.4</p>
          <p className="text-sm text-gray-500 mt-1">B+ average</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900">Pending Tasks</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">2</p>
          <p className="text-sm text-gray-500 mt-1">Surveys due soon</p>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-white rounded-lg shadow border border-gray-100">
        <div className="border-b border-gray-200 p-4">
          <h3 className="text-lg font-medium text-gray-900">
            Recent Announcements
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`p-4 hover:bg-gray-50 ${
                announcement.important ? "border-l-4 border-l-red-500" : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900">
                  {announcement.title}
                </h4>
                <span className="text-sm text-gray-500">
                  {announcement.date}
                </span>
              </div>
              <p className="text-gray-600 mt-1">{announcement.content}</p>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-100 text-center">
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            View All Announcements
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
