import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    // Access roles safely
    const roleClaim =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const roles = Array.isArray(roleClaim) ? roleClaim : [roleClaim];
    const userId = String(decoded["nameid"]);
    return { ...decoded, roles, userId }; // Add roles as an array for easy handling
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
