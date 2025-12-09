export async function logoutUser() {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Logout error:", err);
    return { success: false, message: "Something went wrong" };
  }
}
