
import { loadEnvConfig } from "@next/env";

export async function apiRequest({ apiEndPoint, method = "POST", body } : ApiProps ) {
    const BASE_URL = process.env.API_URL || "http://localhost:3001";
    const authToken = localStorage.getItem("token"); 

    if (!BASE_URL) {
        throw new Error("NEXT_PUBLIC_API_URL is not defined in environment variables");
    }

    const response = await fetch(`${BASE_URL}${apiEndPoint}`, {
        method: method,
        headers: { 
            "Content-Type": "application/json",
            ...(authToken && { "Authorization": `Bearer ${authToken}` })
        },
        body: method !== "GET" ? JSON.stringify(body) : undefined,
    });

    return await response.json();
}