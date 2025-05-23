// src/components/dashboard/EventCalendar.tsx
"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MoreHorizontal, Calendar as CalendarIcon, Clock } from "lucide-react";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  type: "class" | "event" | "holiday" | "exam";
  description?: string;
}

// Sample events data
const events: Event[] = [
  {
    id: 1,
    title: "Mid-term Exams",
    date: "2025-05-28",
    time: "09:00 AM - 12:00 PM",
    type: "exam",
    description: "English Communication and Writing mid-term examinations",
  },
  {
    id: 2,
    title: "Victoria Day Holiday",
    date: "2025-05-19",
    time: "All Day",
    type: "holiday",
    description: "Campus closed for Victoria Day",
  },
  {
    id: 3,
    title: "Student Talent Show",
    date: "2025-05-30",
    time: "6:00 PM - 8:00 PM",
    type: "event",
    description: "Annual student talent showcase in the main auditorium",
  },
  {
    id: 4,
    title: "TOEFL Practice Test",
    date: "2025-05-25",
    time: "2:00 PM - 5:00 PM",
    type: "exam",
    description: "Practice test for TOEFL preparation students",
  },
  {
    id: 5,
    title: "Cultural Exchange Day",
    date: "2025-05-31",
    time: "10:00 AM - 4:00 PM",
    type: "event",
    description: "International students cultural presentation day",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return events.filter((event) => event.date === dateString);
  };

  // Get upcoming events (next 7 days)
  const getUpcomingEvents = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    return events
      .filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  // Highlight dates with events
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dayEvents = getEventsForDate(date);
      if (dayEvents.length > 0) {
        return (
          <div className="flex justify-center mt-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
        );
      }
    }
    return null;
  };

  // Style tiles based on event types
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dayEvents = getEventsForDate(date);
      if (dayEvents.length > 0) {
        const hasHoliday = dayEvents.some((event) => event.type === "holiday");
        const hasExam = dayEvents.some((event) => event.type === "exam");

        if (hasHoliday) return "holiday-tile";
        if (hasExam) return "exam-tile";
        return "event-tile";
      }
    }
    return "";
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onChange(date);
  };

  const upcomingEvents = getUpcomingEvents();
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "holiday":
        return "border-l-red-500 bg-red-50";
      case "exam":
        return "border-l-orange-500 bg-orange-50";
      case "event":
        return "border-l-blue-500 bg-blue-50";
      default:
        return "border-l-gray-500 bg-gray-50";
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "exam":
        return "📝";
      case "holiday":
        return "🎉";
      case "event":
        return "🎭";
      default:
        return "📅";
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
      <style jsx global>{`
        .react-calendar {
          width: 100% !important;
          border: none !important;
          font-family: "Inter", sans-serif !important;
        }

        .react-calendar__navigation__label__labelText {
          font-weight: 600 !important;
        }

        .react-calendar__tile--active {
          background-color: #3b82f6 !important;
          color: white !important;
        }

        .react-calendar__tile--now {
          background-color: #e0f2fe !important;
          color: #0f172a !important;
        }

        .event-tile {
          background-color: #dbeafe !important;
        }

        .holiday-tile {
          background-color: #fecaca !important;
          color: #7f1d1d !important;
        }

        .exam-tile {
          background-color: #fed7aa !important;
          color: #9a3412 !important;
        }

        .react-calendar__tile {
          border-radius: 6px !important;
          margin: 1px !important;
        }
      `}</style>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Events & Calendar
        </h3>
        <MoreHorizontal className="h-5 w-5 text-gray-400" />
      </div>

      {/* Calendar */}
      <div className="mb-6">
        <Calendar
          onChange={onChange}
          value={value}
          onClickDay={handleDateClick}
          tileContent={tileContent}
          tileClassName={tileClassName}
          className="w-full"
        />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-200 rounded"></div>
          <span>Events</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-orange-200 rounded"></div>
          <span>Exams</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-200 rounded"></div>
          <span>Holidays</span>
        </div>
      </div>

      {/* Selected Date Events */}
      {selectedDate && selectedDateEvents.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">
            Events on {selectedDate.toDateString()}
          </h4>
          <div className="space-y-2">
            {selectedDateEvents.map((event) => (
              <div
                key={event.id}
                className={`p-3 rounded-lg border-l-4 ${getEventTypeColor(
                  event.type
                )}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {getEventTypeIcon(event.type)}
                    </span>
                    <div>
                      <h5 className="font-medium text-gray-900 text-sm">
                        {event.title}
                      </h5>
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </p>
                    </div>
                  </div>
                </div>
                {event.description && (
                  <p className="text-xs text-gray-600 mt-2">
                    {event.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Upcoming Events</h4>
        <div className="space-y-3">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <div
                key={event.id}
                className={`p-3 rounded-lg border-l-4 ${getEventTypeColor(
                  event.type
                )}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {getEventTypeIcon(event.type)}
                    </span>
                    <div>
                      <h5 className="font-medium text-gray-900 text-sm">
                        {event.title}
                      </h5>
                      <p className="text-xs text-gray-600">
                        {new Date(event.date).toLocaleDateString()} •{" "}
                        {event.time}
                      </p>
                    </div>
                  </div>
                </div>
                {event.description && (
                  <p className="text-xs text-gray-600 mt-2 ml-8">
                    {event.description}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              No upcoming events in the next 7 days
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
