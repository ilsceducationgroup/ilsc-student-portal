// src/components/classes/AttendanceChart.tsx
"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { MoreHorizontal } from "lucide-react";
import { User } from "@/types";

interface AttendanceChartProps {
  userData: User;
}

// Parse attendance data from HTML or provide mock data
const parseAttendanceData = (userData: User) => {
  // In a real implementation, you'd parse the HTML attendance data
  // For now, providing structured data
  return {
    monthly: [
      { month: "March 2025", present: 20, absent: 1, late: 2, percentage: 95 },
      { month: "April 2025", present: 21, absent: 0, late: 1, percentage: 99 },
      { month: "May 2025", present: 12, absent: 1, late: 0, percentage: 92 },
    ],
    weekly: [
      { day: "Mon", present: 18, absent: 2 },
      { day: "Tue", present: 19, absent: 1 },
      { day: "Wed", present: 20, absent: 0 },
      { day: "Thu", present: 17, absent: 3 },
      { day: "Fri", present: 19, absent: 1 },
    ],
    overall: {
      totalDays: 54,
      presentDays: 53,
      absentDays: 1,
      lateDays: 3,
      percentage: 96,
    },
  };
};

const AttendanceChart: React.FC<AttendanceChartProps> = ({ userData }) => {
  const attendanceData = parseAttendanceData(userData);

  const pieData = [
    {
      name: "Present",
      value: attendanceData.overall.presentDays,
      fill: "#10b981",
    },
    {
      name: "Absent",
      value: attendanceData.overall.absentDays,
      fill: "#ef4444",
    },
    { name: "Late", value: attendanceData.overall.lateDays, fill: "#f59e0b" },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Overall Attendance Summary */}
      <div className="bg-white rounded-lg shadow border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Overall Attendance
          </h3>
          <MoreHorizontal className="h-5 w-5 text-gray-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {attendanceData.overall.percentage}%
            </div>
            <div className="text-sm text-gray-500">Overall Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {attendanceData.overall.presentDays}
            </div>
            <div className="text-sm text-gray-500">Present Days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {attendanceData.overall.absentDays}
            </div>
            <div className="text-sm text-gray-500">Absent Days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {attendanceData.overall.lateDays}
            </div>
            <div className="text-sm text-gray-500">Late Days</div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Attendance Bar Chart */}
      <div className="bg-white rounded-lg shadow border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Weekly Attendance
          </h3>
          <MoreHorizontal className="h-5 w-5 text-gray-400" />
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceData.weekly} barSize={40}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f3f4f6"
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickLine={false}
              />
              <YAxis
                axisLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                align="left"
                verticalAlign="top"
                wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
              />
              <Bar
                dataKey="present"
                fill="#10b981"
                name="Present"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="absent"
                fill="#ef4444"
                name="Absent"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Attendance Table */}
      <div className="bg-white rounded-lg shadow border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Monthly Breakdown
          </h3>
          <MoreHorizontal className="h-5 w-5 text-gray-400" />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Present
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Absent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Late
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceData.monthly.map((month, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {month.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    {month.present}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                    {month.absent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-medium">
                    {month.late}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        month.percentage >= 95
                          ? "bg-green-100 text-green-800"
                          : month.percentage >= 85
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {month.percentage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
