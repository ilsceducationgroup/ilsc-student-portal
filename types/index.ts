// Student User type
export interface User {
  id: number;
  username: string;
  idnumber: string;
  firstname: string;
  lastname: string;
  email: string;
  emailstop: boolean;
  phone: string;
  school: string;
  firstlogin?: string;
  lastlogin?: string;
  lastip?: string;
  timecreated?: string;
  timemodified?: string;
  iStatus?: number;
  userguid?: string;
  userFields?: {
    TimeTable?: string;
    SPR?: string;
    Attendance?: string;
    [key: string]: string | undefined;
  };
}

// Announcement type
export interface Announcement {
  id: number;
  title: string;
  date: string;
  content: string;
  important: boolean;
}

// Service Request type
export interface ServiceRequest {
  id: number;
  type: string;
  status: "Pending" | "In Progress" | "Completed";
  dateSubmitted: string;
  lastUpdated: string;
  details: string;
}

// Document type
export interface Document {
  id: number;
  name: string;
  date: string;
  type: string;
}

// Survey type
export interface Survey {
  id: number;
  title: string;
  dueDate: string;
  status: "Pending" | "Completed";
  questions: number;
}

// Component Props

export interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface HeaderProps {
  userData: User;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export interface MobileMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  userData: User;
}

export interface NotificationsMenuProps {
  announcements: Announcement[];
}

export interface DashboardProps {
  userData: User;
  announcements: Announcement[];
}

export interface ProfileProps {
  userData: User;
}

export interface ClassesProps {
  userData: User;
}

export interface RequestsProps {
  serviceRequests: ServiceRequest[];
}

export interface DocumentsProps {
  documents: Document[];
}

export interface SurveysProps {
  surveys: Survey[];
}
