export const ADMIN_API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export const getAdminAuthHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});
