interface ApiProps {
  body?: any;
  apiEndPoint: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  authToken?: string;
}