// src/components/classes/ClassInformation.tsx
import React, { useState } from "react";
import { User } from "@/types";
import { Calendar, BarChart3, Clock, FileText } from "lucide-react";
import { createMarkup } from "@/utils/helpers";
import BigCalendar from "./BigCalendar";
import AttendanceChart from "./AttendanceChart";

interface ClassesProps {
  userData: User;
}

const ClassInformation: React.FC<ClassesProps> = ({ userData }) => {
  const [activeSectionDropdown, setActiveSectionDropdown] = useState<
    string | null
  >("timetable");
  const [viewMode, setViewMode] = useState<"calendar" | "table">("calendar"); // For timetable
  const [attendanceView, setAttendanceView] = useState<"chart" | "table">(
    "chart"
  ); // For attendance

  const toggleDropdown = (section: string) => {
    if (activeSectionDropdown === section) {
      setActiveSectionDropdown(null);
    } else {
      setActiveSectionDropdown(section);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow border border-gray-100">
        <div className="border-b border-gray-200 p-4">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <h3 className="text-lg font-medium text-gray-900">
              Class Information
            </h3>

            {/* Section Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                  activeSectionDropdown === "timetable"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => toggleDropdown("timetable")}
              >
                <Calendar className="h-4 w-4 inline-block mr-2" />
                Timetable
              </button>
              <button
                className={`px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                  activeSectionDropdown === "attendance"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => toggleDropdown("attendance")}
              >
                <BarChart3 className="h-4 w-4 inline-block mr-2" />
                Attendance
              </button>
              <button
                className={`px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                  activeSectionDropdown === "results"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => toggleDropdown("results")}
              >
                <FileText className="h-4 w-4 inline-block mr-2" />
                Progress Reports
              </button>
            </div>
          </div>

          {/* View Mode Toggles */}
          {activeSectionDropdown === "timetable" && (
            <div className="mt-4 flex gap-2">
              <button
                className={`px-3 py-1 text-xs rounded-md ${
                  viewMode === "calendar"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setViewMode("calendar")}
              >
                📅 Calendar View
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-md ${
                  viewMode === "table"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setViewMode("table")}
              >
                📋 Table View
              </button>
            </div>
          )}

          {activeSectionDropdown === "attendance" && (
            <div className="mt-4 flex gap-2">
              <button
                className={`px-3 py-1 text-xs rounded-md ${
                  attendanceView === "chart"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setAttendanceView("chart")}
              >
                📊 Chart View
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-md ${
                  attendanceView === "table"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setAttendanceView("table")}
              >
                📋 Table View
              </button>
            </div>
          )}
        </div>

        <div className="p-6">
          {/* Timetable Section */}
          {activeSectionDropdown === "timetable" && (
            <div>
              {viewMode === "calendar" ? (
                <div className="h-[600px]">
                  <BigCalendar userData={userData} />
                </div>
              ) : (
                <div
                  className="timetable-container prose max-w-none"
                  dangerouslySetInnerHTML={createMarkup(
                    userData.userFields?.TimeTable
                  )}
                />
              )}
            </div>
          )}

          {/* Attendance Section */}
          {activeSectionDropdown === "attendance" && (
            <div>
              {attendanceView === "chart" ? (
                <AttendanceChart userData={userData} />
              ) : (
                <div
                  className="timetable-container prose max-w-none"
                  dangerouslySetInnerHTML={createMarkup(
                    userData.userFields?.Attendance
                  )}
                />
              )}
            </div>
          )}

          {/* Progress Reports Section */}
          {activeSectionDropdown === "results" && (
            <div
              className="timetable-container prose max-w-none"
              dangerouslySetInnerHTML={createMarkup(userData.userFields?.SPR)}
            />
          )}

          {/* Default View */}
          {!activeSectionDropdown && (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                View Your Class Information
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Select one of the options above to view your timetable,
                attendance record, or progress reports.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <button
                  onClick={() => toggleDropdown("timetable")}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                >
                  <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-medium text-gray-900">Timetable</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    View your class schedule
                  </p>
                </button>
                <button
                  onClick={() => toggleDropdown("attendance")}
                  className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200"
                >
                  <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-medium text-gray-900">Attendance</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Check your attendance record
                  </p>
                </button>
                <button
                  onClick={() => toggleDropdown("results")}
                  className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
                >
                  <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-medium text-gray-900">Reports</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    View your progress reports
                  </p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassInformation;
