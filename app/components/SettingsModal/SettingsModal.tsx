export interface SettingsFormData {
  // Profile
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  timezone: string;
  
  // Security
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  
  // Notifications
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyReport: boolean;
  monthlyReport: boolean;
}