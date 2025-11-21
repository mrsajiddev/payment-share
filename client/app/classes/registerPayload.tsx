export interface RegisterPayload {
  username: string;
  fullName: string;
  email: string;
  password: string;
  mobileNumber?: string;
  accountVerified: "yes" | "no";
}