import React, { useState } from "react";
import { User } from "../../../../types";
import { Calendar } from "lucide-react";
import { createMarkup } from "../../../../utils/helpers";

interface ClassesProps {
  userData: User;
}

const ClassInformation: React.FC<ClassesProps> = ({ userData }) => {
  const [activeSectionDropdown, setActiveSectionDropdown] = useState<
    string | null
  >(null);

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
        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Class Information
          </h3>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-md font-medium ${
                activeSectionDropdown === "timetable"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => toggleDropdown("timetable")}
            >
              Timetable
            </button>
            <button
              className={`px-4 py-2 rounded-md font-medium ${
                activeSectionDropdown === "attendance"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => toggleDropdown("attendance")}
            >
              Attendance
            </button>
            <button
              className={`px-4 py-2 rounded-md font-medium ${
                activeSectionDropdown === "results"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => toggleDropdown("results")}
            >
              Progress Reports
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeSectionDropdown === "timetable" && (
            <div
              className="prose max-w-none"
              {...createMarkup(userData.userFields?.TimeTable)}
            />
          )}

          {activeSectionDropdown === "attendance" && (
            <div
              className="prose max-w-none"
              {...createMarkup(userData.userFields?.Attendance)}
            />
          )}

          {activeSectionDropdown === "results" && (
            <div
              className="prose max-w-none"
              {...createMarkup(userData.userFields?.SPR)}
            />
          )}

          {!activeSectionDropdown && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                View Your Class Information
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Select one of the options above to view your timetable,
                attendance record, or progress reports.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassInformation;
