// src/components/classes/BigCalendar.tsx
"use client";
import { Calendar, momentLocalizer, Views, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { User } from "@/types";

const localizer = momentLocalizer(moment);

interface BigCalendarProps {
  userData: User;
}

// Generate calendar events from user's timetable data
const generateCalendarEvents = (userData: User) => {
  const events = [];
  const currentDate = new Date();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1); // Monday

  // Sample schedule - in real app, this would parse the HTML timetable
  const weeklySchedule = [
    {
      title: "English Communication",
      startTime: "08:30",
      endTime: "10:30",
      room: "Room 301",
      days: [1, 2, 3, 4, 5], // Mon-Fri
      color: "#e2f8ff",
    },
    {
      title: "Break",
      startTime: "10:30",
      endTime: "10:45",
      room: "",
      days: [1, 2, 3, 4, 5],
      color: "#f5f5f5",
      isBreak: true,
    },
    {
      title: "Academic Writing",
      startTime: "10:45",
      endTime: "12:45",
      room: "Room 205",
      days: [1, 2, 3, 4, 5],
      color: "#fefce8",
    },
    {
      title: "Lunch",
      startTime: "12:45",
      endTime: "13:45",
      room: "",
      days: [1, 2, 3, 4, 5],
      color: "#f5f5f5",
      isBreak: true,
    },
    {
      title: "TOEFL Prep",
      startTime: "13:45",
      endTime: "15:45",
      room: "Room 102",
      days: [1, 2, 3, 4, 5],
      color: "#f2f1ff",
    },
  ];

  weeklySchedule.forEach((schedule) => {
    schedule.days.forEach((dayOffset) => {
      const eventDate = new Date(startOfWeek);
      eventDate.setDate(startOfWeek.getDate() + dayOffset - 1);

      const [startHour, startMinute] = schedule.startTime
        .split(":")
        .map(Number);
      const [endHour, endMinute] = schedule.endTime.split(":").map(Number);

      const startDateTime = new Date(eventDate);
      startDateTime.setHours(startHour, startMinute, 0);

      const endDateTime = new Date(eventDate);
      endDateTime.setHours(endHour, endMinute, 0);

      events.push({
        title: schedule.title,
        start: startDateTime,
        end: endDateTime,
        resource: {
          room: schedule.room,
          color: schedule.color,
          isBreak: schedule.isBreak,
        },
      });
    });
  });

  return events;
};

const BigCalendar: React.FC<BigCalendarProps> = ({ userData }) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const events = generateCalendarEvents(userData);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  const eventStyleGetter = (event: any) => {
    const backgroundColor = event.resource?.color || "#3174ad";
    const isBreak = event.resource?.isBreak;

    return {
      style: {
        backgroundColor,
        borderRadius: "8px",
        opacity: isBreak ? 0.7 : 1,
        color: isBreak ? "#666" : "black",
        border: "none",
        fontSize: "12px",
        padding: "4px 8px",
      },
    };
  };

  const CustomEvent = ({ event }: { event: any }) => (
    <div className="flex flex-col h-full">
      <span className="font-medium text-xs truncate">{event.title}</span>
      {event.resource?.room && (
        <span className="text-xs opacity-75 truncate">
          {event.resource.room}
        </span>
      )}
    </div>
  );

  return (
    <div className="h-full">
      <style jsx global>{`
        .rbc-calendar {
          font-family: "Inter", sans-serif !important;
        }

        .rbc-btn-group:first-child {
          display: none !important;
        }

        .rbc-toolbar-label {
          text-align: right !important;
          padding: 0px 20px !important;
          font-weight: 600 !important;
        }

        .rbc-btn-group:last-child {
          font-size: 13px !important;
        }

        .rbc-btn-group:last-child button {
          border: none !important;
          background-color: #f1f0ff !important;
          margin-left: 2px !important;
          border-radius: 6px !important;
          padding: 6px 12px !important;
        }

        .rbc-toolbar button.rbc-active {
          background-color: #3b82f6 !important;
          color: white !important;
          box-shadow: none !important;
        }

        .rbc-time-view {
          border-color: #e5e7eb !important;
        }

        .rbc-time-header-content {
          display: none !important;
        }

        .rbc-time-content {
          border: none !important;
        }

        .rbc-time-gutter.rbc-time-column {
          font-size: 12px !important;
          background-color: #f8fafc !important;
        }

        .rbc-time-gutter.rbc-time-column .rbc-timeslot-group {
          padding: 0px 15px !important;
        }

        .rbc-timeslot-group {
          background-color: #ffffff !important;
        }

        .rbc-day-slot {
          font-size: 14px !important;
        }

        .rbc-event {
          border: none !important;
          margin: 2px !important;
          width: 98% !important;
        }

        .rbc-event-label {
          display: none !important;
        }

        .rbc-header {
          background-color: #f1f5f9 !important;
          border-bottom: 2px solid #e2e8f0 !important;
          font-weight: 600 !important;
          padding: 12px !important;
        }
      `}</style>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["work_week", "day"]}
        view={view}
        style={{ height: "100%" }}
        onView={handleOnChangeView}
        defaultDate={new Date()}
        min={new Date(0, 0, 0, 8, 0, 0)}
        max={new Date(0, 0, 0, 17, 0, 0)}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CustomEvent,
        }}
        formats={{
          timeGutterFormat: "HH:mm",
          eventTimeRangeFormat: ({ start, end }) =>
            `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`,
        }}
      />
    </div>
  );
};

export default BigCalendar;
