// src/components/layout/ContentRouter.tsx
import React from "react";
import { User } from "@/types";
import { TabType } from "@/hooks/useNavigation";
import Dashboard from "@/components/dashboard/Dashboard";
import Profile from "@/components/profile/StudentProfile";
import Classes from "@/components/classes/ClassInformation";
import Requests from "@/components/requests/ServiceRequestList";
import Documents from "@/components/documents/DocumentList";
import Surveys from "@/components/surveys/SurveyList";
import {
  announcements,
  serviceRequests,
  documents,
  surveys,
} from "@/data/mockData";

interface ContentRouterProps {
  activeTab: TabType;
  userData: User;
  onUserUpdate: (updatedUser: User) => void;
}

export const ContentRouter: React.FC<ContentRouterProps> = ({
  activeTab,
  userData,
  onUserUpdate,
}) => {
  switch (activeTab) {
    case "home":
      return <Dashboard userData={userData} announcements={announcements} />;
    case "profile":
      return <Profile userData={userData} onUserUpdate={onUserUpdate} />;
    case "classes":
      return <Classes userData={userData} />;
    case "requests":
      return <Requests serviceRequests={serviceRequests} />;
    case "documents":
      return <Documents documents={documents} />;
    case "surveys":
      return <Surveys surveys={surveys} />;
    default:
      return (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Select a menu item
          </h3>
          <p className="text-gray-600">
            Please select an option from the menu to view content.
          </p>
        </div>
      );
  }
};
