import { User, Announcement, ServiceRequest, Document, Survey } from "@/types";

// Simulated user data based on DB structure
export const userData: User = {
  id: 1,
  username: "jsmith2024",
  idnumber: "S12345678",
  firstname: "John",
  lastname: "Smith",
  email: "jsmith2024@ilsceducation.com",
  emailstop: false,
  phone: "604-555-1234",
  school: "ILSC Vancouver",
  address: "123 Student Housing Ave, Vancouver, BC V6K 1A2",
  lastlogin: new Date().toISOString(),
  userFields: {
    TimeTable: `<div>
      <h3>Week of May 19-23, 2025</h3>
      <table>
        <tr><th>Time</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th></tr>
        <tr>
          <td>8:30 - 10:30</td>
          <td>English Communication (Room 301)</td>
          <td>English Communication (Room 301)</td>
          <td>English Communication (Room 301)</td>
          <td>English Communication (Room 301)</td>
          <td>English Communication (Room 301)</td>
        </tr>
        <tr>
          <td>10:30 - 10:45</td>
          <td colspan="5" style="text-align: center;">Break</td>
        </tr>
        <tr>
          <td>10:45 - 12:45</td>
          <td>Academic Writing (Room 205)</td>
          <td>Academic Writing (Room 205)</td>
          <td>Academic Writing (Room 205)</td>
          <td>Academic Writing (Room 205)</td>
          <td>Academic Writing (Room 205)</td>
        </tr>
        <tr>
          <td>12:45 - 1:45</td>
          <td colspan="5" style="text-align: center;">Lunch</td>
        </tr>
        <tr>
          <td>1:45 - 3:45</td>
          <td>TOEFL Prep (Room 102)</td>
          <td>TOEFL Prep (Room 102)</td>
          <td>TOEFL Prep (Room 102)</td>
          <td>TOEFL Prep (Room 102)</td>
          <td>TOEFL Prep (Room 102)</td>
        </tr>
      </table>
    </div>`,
    SPR: `<div>
      <h3>Student Progress Report - Term Spring 2025</h3>
      <table>
        <tr><th>Course</th><th>Instructor</th><th>Grade</th><th>Comments</th></tr>
        <tr>
          <td>English Communication</td>
          <td>Sarah Johnson</td>
          <td>A-</td>
          <td>John participates actively and has shown significant improvement in speaking skills.</td>
        </tr>
        <tr>
          <td>Academic Writing</td>
          <td>Michael Chen</td>
          <td>B+</td>
          <td>Good structure in essays, but needs to work on more complex grammatical structures.</td>
        </tr>
        <tr>
          <td>TOEFL Prep</td>
          <td>Lisa Wilson</td>
          <td>B</td>
          <td>Making steady progress. Should focus more on listening comprehension exercises.</td>
        </tr>
      </table>
      <p><strong>Overall Assessment:</strong> John is making good progress in all classes. His speaking fluency has notably improved this term. To reach the next level, he should focus on expanding his academic vocabulary and improving his listening comprehension skills.</p>
    </div>`,
    Attendance: `<div>
      <h3>Attendance Record - Spring 2025</h3>
      <table>
        <tr><th>Month</th><th>Present</th><th>Absent</th><th>Late</th><th>Percentage</th></tr>
        <tr>
          <td>March 2025</td>
          <td>20</td>
          <td>1</td>
          <td>2</td>
          <td>95%</td>
        </tr>
        <tr>
          <td>April 2025</td>
          <td>21</td>
          <td>0</td>
          <td>1</td>
          <td>99%</td>
        </tr>
        <tr>
          <td>May 2025</td>
          <td>12</td>
          <td>1</td>
          <td>0</td>
          <td>92%</td>
        </tr>
      </table>
      <p><strong>Overall Attendance Rate: 96%</strong></p>
      <p><em>Note: Minimum required attendance is 80%. Students falling below 80% will be placed on academic probation.</em></p>
    </div>`,
  },
};

// Simulated announcements
export const announcements: Announcement[] = [
  {
    id: 1,
    title: "Summer Term Registration Now Open",
    date: "May 15, 2025",
    content:
      "Registration for summer term classes is now open. Please meet with your academic advisor to plan your schedule.",
    important: true,
  },
  {
    id: 2,
    title: "Campus Closure - Victoria Day",
    date: "May 17, 2025",
    content:
      "The campus will be closed on Monday, May 19, 2025 for Victoria Day. Classes will resume on Tuesday, May 20.",
    important: true,
  },
  {
    id: 3,
    title: "Student Talent Show",
    date: "May 10, 2025",
    content:
      "Join us for the annual student talent show on Friday, May 30 at 6:00 PM in the main auditorium.",
    important: false,
  },
];

// Simulated service requests
export const serviceRequests: ServiceRequest[] = [
  {
    id: 101,
    type: "Class Change",
    status: "In Progress",
    dateSubmitted: "May 12, 2025",
    lastUpdated: "May 15, 2025",
    details:
      "Request to change from morning to afternoon classes due to new part-time job.",
  },
  {
    id: 102,
    type: "Accommodation",
    status: "Completed",
    dateSubmitted: "April 5, 2025",
    lastUpdated: "April 10, 2025",
    details: "Request for information about homestay options for summer term.",
  },
];

// Simulated documents
export const documents: Document[] = [
  {
    id: 201,
    name: "Enrollment Confirmation Letter",
    date: "February 10, 2025",
    type: "Official Document",
  },
  {
    id: 202,
    name: "Tuition Receipt - Spring 2025",
    date: "March 1, 2025",
    type: "Financial",
  },
  {
    id: 203,
    name: "Student Handbook 2025",
    date: "January 5, 2025",
    type: "Information",
  },
];

// Simulated surveys
export const surveys: Survey[] = [
  {
    id: 301,
    title: "Spring 2025 Course Satisfaction Survey",
    dueDate: "May 25, 2025",
    status: "Pending",
    questions: 15,
  },
  {
    id: 302,
    title: "Campus Facilities Feedback",
    dueDate: "May 30, 2025",
    status: "Pending",
    questions: 10,
  },
  {
    id: 303,
    title: "English Language Program Assessment",
    dueDate: "April 30, 2025",
    status: "Completed",
    questions: 20,
  },
];
