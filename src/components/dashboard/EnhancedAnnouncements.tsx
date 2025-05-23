// src/components/dashboard/EnhancedAnnouncements.tsx
import {
  MoreHorizontal,
  Bell,
  AlertCircle,
  Info,
  Calendar,
} from "lucide-react";
import { Announcement } from "@/types";

interface EnhancedAnnouncementsProps {
  announcements: Announcement[];
}

const EnhancedAnnouncements: React.FC<EnhancedAnnouncementsProps> = ({
  announcements,
}) => {
  const getAnnouncementStyle = (important: boolean, index: number) => {
    if (important) {
      return "bg-red-50 border-l-red-500";
    }

    const styles = [
      "bg-blue-50 border-l-blue-500",
      "bg-purple-50 border-l-purple-500",
      "bg-yellow-50 border-l-yellow-500",
      "bg-green-50 border-l-green-500",
    ];

    return styles[index % styles.length];
  };

  const getAnnouncementIcon = (important: boolean) => {
    if (important) {
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
    return <Info className="h-4 w-4 text-blue-600" />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return "Today";
    } else if (diffDays === 2) {
      return "Yesterday";
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Announcements
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
            View All
          </span>
          <MoreHorizontal className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="space-y-3">
        {announcements.map((announcement, index) => (
          <div
            key={announcement.id}
            className={`p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-sm cursor-pointer ${getAnnouncementStyle(
              announcement.important,
              index
            )}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                {getAnnouncementIcon(announcement.important)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-2 pr-2">
                      {announcement.title}
                      {announcement.important && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Important
                        </span>
                      )}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {announcement.content}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(announcement.date)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {announcements.length === 0 && (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              No announcements
            </h3>
            <p className="text-sm text-gray-500">
              Check back later for updates
            </p>
          </div>
        )}
      </div>

      {announcements.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200">
            View All Announcements
          </button>
        </div>
      )}
    </div>
  );
};

export default EnhancedAnnouncements;
