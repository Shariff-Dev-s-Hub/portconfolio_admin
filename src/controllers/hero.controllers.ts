import { UseFormSetValue } from "react-hook-form";

// Helper function to get the JWT token
const getToken = (): string | null => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    console.error("No token found in localStorage");
    throw new Error("Login Required");
  }
  return JSON.parse(token);
};

// Fetch hero settings
export const getHeroSettings = async (
  setValue: UseFormSetValue<{ layout: string }>,
  setIsSettingsFetching: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const token = getToken();
    setIsSettingsFetching(true);
    const res = await fetch("/api/hero/get-settings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error(
        "Failed to fetch hero settings:",
        errorData.error || "Unknown error"
      );
      throw new Error(errorData.error || "Failed to fetch hero settings");
    }

    const data = await res.json();
    if (data) {
      setValue("layout", data.layout); // Set the layout value in the form
    }
    setIsSettingsFetching(false);
  } catch (error) {
    setIsSettingsFetching(false);
    if (error instanceof Error) {
      console.error("Error fetching hero settings:", error.message);
    } else {
      console.error("Error fetching hero settings:", error);
    }
  }
};

// Save hero settings
export const saveHeroSettings = async (data: { layout: string }) => {
  try {
    const token = getToken();

    const res = await fetch("/api/hero/save-settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // Include cookies if needed
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error(
        "Failed to save hero settings:",
        errorData.error || "Unknown error"
      );
      throw new Error(errorData.error || "Failed to save hero settings");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error saving hero settings:", error.message);
    } else {
      console.error("Error saving hero settings:", error);
    }
    throw error;
  }
};
