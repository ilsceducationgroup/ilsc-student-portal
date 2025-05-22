// src/types/database.ts
export interface Database {
  public: {
    Tables: {
      tblUser: {
        Row: {
          id: number;
          username: string;
          idnumber: string;
          firstname: string;
          lastname: string;
          email: string;
          emailstop: boolean;
          phone: string;
          school: string;
          address: string | null;
          firstlogin: string | null;
          lastlogin: string | null;
          lastip: string;
          timecreated: string | null;
          timemodified: string | null;
          istatus: number;
          userguid: string | null;
        };
        Insert: {
          id?: number;
          username: string;
          idnumber: string;
          firstname: string;
          lastname: string;
          email: string;
          emailstop?: boolean;
          phone: string;
          school: string;
          address?: string | null;
          firstlogin?: string | null;
          lastlogin?: string | null;
          lastip?: string;
          timecreated?: string | null;
          timemodified?: string | null;
          istatus?: number;
          userguid?: string | null;
        };
        Update: {
          id?: number;
          username?: string;
          idnumber?: string;
          firstname?: string;
          lastname?: string;
          email?: string;
          emailstop?: boolean;
          phone?: string;
          school?: string;
          address?: string | null;
          firstlogin?: string | null;
          lastlogin?: string | null;
          lastip?: string;
          timecreated?: string | null;
          timemodified?: string | null;
          istatus?: number;
          userguid?: string | null;
        };
      };
      UserData: {
        Row: {
          id: number;
          userid: number;
          fieldid: number;
          data: string | null;
          extdata: string | null;
        };
        Insert: {
          id?: number;
          userid: number;
          fieldid: number;
          data?: string | null;
          extdata?: string | null;
        };
        Update: {
          id?: number;
          userid?: number;
          fieldid?: number;
          data?: string | null;
          extdata?: string | null;
        };
      };
      UserField: {
        Row: {
          id: number;
          shortname: string;
          name: string;
          datatype: string | null;
          description: string | null;
          categoryid: number;
          sortorder: number;
          locked: boolean;
          istatus: number | null;
        };
        Insert: {
          id?: number;
          shortname: string;
          name: string;
          datatype?: string | null;
          description?: string | null;
          categoryid?: number;
          sortorder?: number;
          locked?: boolean;
          istatus?: number | null;
        };
        Update: {
          id?: number;
          shortname?: string;
          name?: string;
          datatype?: string | null;
          description?: string | null;
          categoryid?: number;
          sortorder?: number;
          locked?: boolean;
          istatus?: number | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Update existing User type to match database
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
  address?: string;
  firstlogin?: string;
  lastlogin?: string;
  lastip?: string;
  timecreated?: string;
  timemodified?: string;
  istatus?: number;
  userguid?: string;
  userFields?: {
    TimeTable?: string;
    SPR?: string;
    Attendance?: string;
    [key: string]: string | undefined;
  };
}
