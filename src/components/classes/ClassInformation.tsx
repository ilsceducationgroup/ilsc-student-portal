import React, { useState } from "react";
import { User } from "@/types";
import { Calendar } from "lucide-react";
import { createMarkup } from "@/utils/helpers";

interface ClassesProps {
  userData: User;
}

// Tab button component for consistent styling
const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    className={`px-4 py-2 rounded-md font-medium transition-colors ${
      active
        ? "bg-blue-600 text-white dark:bg-blue-700"
        : "bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

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
      <div className="bg-white dark:bg-dark-card rounded-lg shadow border border-gray-100 dark:border-dark-border">
        <div className="border-b border-gray-200 dark:border-dark-border p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4 md:mb-0">
            Class Information
          </h3>

          {/* Responsive tabs - shown horizontally on desktop, as a grid on mobile */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0 md:flex-nowrap md:justify-end">
            <TabButton
              active={activeSectionDropdown === "timetable"}
              onClick={() => toggleDropdown("timetable")}
            >
              Timetable
            </TabButton>

            <TabButton
              active={activeSectionDropdown === "attendance"}
              onClick={() => toggleDropdown("attendance")}
            >
              Attendance
            </TabButton>

            <TabButton
              active={activeSectionDropdown === "results"}
              onClick={() => toggleDropdown("results")}
            >
              Progress Reports
            </TabButton>
          </div>
        </div>

        <div className="p-6">
          {activeSectionDropdown === "timetable" && (
            <div
              className="timetable-container"
              dangerouslySetInnerHTML={createMarkup(
                userData.userFields?.TimeTable
              )}
            />
          )}

          {activeSectionDropdown === "attendance" && (
            <div
              className="timetable-container"
              dangerouslySetInnerHTML={createMarkup(
                userData.userFields?.Attendance
              )}
            />
          )}

          {activeSectionDropdown === "results" && (
            <div
              className="timetable-container"
              dangerouslySetInnerHTML={createMarkup(userData.userFields?.SPR)}
            />
          )}

          {!activeSectionDropdown && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-2">
                View Your Class Information
              </h3>
              <p className="text-gray-600 dark:text-dark-text-muted mb-6 max-w-md mx-auto">
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
