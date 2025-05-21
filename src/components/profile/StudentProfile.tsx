import React from "react";
import { User } from "@/types";

interface ProfileProps {
  userData: User;
}

const StudentProfile: React.FC<ProfileProps> = ({ userData }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow border border-gray-100">
        <div className="border-b border-gray-200 p-4">
          <h3 className="text-lg font-medium text-gray-900">Student Profile</h3>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-4xl font-bold">
                {userData.firstname.charAt(0)}
                {userData.lastname.charAt(0)}
              </div>
            </div>

            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-gray-900">
                {userData.firstname} {userData.lastname}
              </h2>
              <p className="text-gray-600">Student ID: {userData.idnumber}</p>
              <p className="text-gray-600">School: {userData.school}</p>

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
                    <span className="text-gray-900">{userData.email}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-700 font-medium w-32">
                      Phone:
                    </span>
                    <span className="text-gray-900">{userData.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-700 font-medium w-32">
                      Address:
                    </span>
                    <span className="text-gray-900">{userData.address}</span>
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
    </div>
  );
};

export default StudentProfile;
