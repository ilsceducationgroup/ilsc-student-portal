// src/components/profile/StudentProfile.tsx - Updated with Edit functionality
import React, { useState } from "react";
import { User } from "@/types";
import { Edit3 } from "lucide-react";
import EditProfile from "./EditProfile";

interface ProfileProps {
  userData: User;
  onUserUpdate?: (updatedUser: User) => void;
}

const StudentProfile: React.FC<ProfileProps> = ({ userData, onUserUpdate }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(userData);

  const handleUserUpdate = (updatedUser: User) => {
    setCurrentUserData(updatedUser);
    if (onUserUpdate) {
      onUserUpdate(updatedUser);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow border border-gray-100">
        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Student Profile</h3>
          <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Edit3 className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-4xl font-bold">
                {currentUserData.firstname.charAt(0)}
                {currentUserData.lastname.charAt(0)}
              </div>
            </div>

            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-gray-900">
                {currentUserData.firstname} {currentUserData.lastname}
              </h2>
              <p className="text-gray-600">
                Student ID: {currentUserData.idnumber}
              </p>
              <p className="text-gray-600">School: {currentUserData.school}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Term: Spring 2025
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Level: Intermediate
                </div>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  Program: English for Academic Purposes
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-gray-700 font-medium w-32">
                      Email:
                    </span>
                    <span className="text-gray-900">
                      {currentUserData.email}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-700 font-medium w-32">
                      Phone:
                    </span>
                    <span className="text-gray-900">
                      {currentUserData.phone}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-700 font-medium w-32">
                      Address:
                    </span>
                    <span className="text-gray-900">
                      {currentUserData.address || "Not provided"}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-700 font-medium w-32">
                      Nationality:
                    </span>
                    <span className="text-gray-900">Brazil</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Emergency Contact
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-gray-700 font-medium w-32">
                      Name:
                    </span>
                    <span className="text-gray-900">Maria Silva</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-700 font-medium w-32">
                      Relationship:
                    </span>
                    <span className="text-gray-900">Mother</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-700 font-medium w-32">
                      Phone:
                    </span>
                    <span className="text-gray-900">+55 21 98765-4321</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-700 font-medium w-32">
                      Email:
                    </span>
                    <span className="text-gray-900">maria.silva@email.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfile
          userData={currentUserData}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUserUpdate}
        />
      )}
    </div>
  );
};

export default StudentProfile;
