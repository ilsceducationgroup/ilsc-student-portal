// components/layout/NotificationsMenu.tsx
import React from "react";
import { useNotifications } from "../../../../hooks/useNotifications";
import { NotificationsMenuProps } from "../../../../types";

const NotificationsMenu: React.FC<NotificationsMenuProps> = ({
  announcements,
}) => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-20 border border-gray-200">
      <div className="p-3 border-b border-gray-200">
        <h3 className="text-lg font-medium">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {announcements?.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${
              notification.important ? "border-l-4 border-l-red-500" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-gray-900">
                {notification.title}
              </h4>
              <span className="text-xs text-gray-500">{notification.date}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{notification.content}</p>
          </div>
        ))}
      </div>
      <div className="p-3 text-center">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationsMenu;
