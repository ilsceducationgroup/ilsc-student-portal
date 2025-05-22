// src/lib/services/index.ts - Main API exports
export { UserService } from "./userService";
export { ConnectionService } from "./connectionService";

// Can add more services here as the app grows:
// export { AnnouncementService } from './announcementService';
// export { DocumentService } from './documentService';
// export { RequestService } from './requestService';
// export { SurveyService } from './surveyService';

// Convenience re-exports for backward compatibility
export {
  supabase,
  handleSupabaseError,
  handleSupabaseSuccess,
} from "@/lib/supabase/client";

// Legacy function exports for backward compatibility
import { UserService } from "./userService";
import { ConnectionService } from "./connectionService";

export const testUserWithFields = ConnectionService.testUserWithFields;
export const testSimpleConnection = ConnectionService.testConnection;
export const updateUserProfile = UserService.updateProfile;
export const getUserById = UserService.getUserById;
