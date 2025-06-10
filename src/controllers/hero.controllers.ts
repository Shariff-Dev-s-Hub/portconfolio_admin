import { UseFormSetValue } from "react-hook-form";
import { HeroFormValues } from "@/lib/interfaces";
import toast from "react-hot-toast";

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
  setValue: UseFormSetValue<HeroFormValues>,
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
      setValue("layout", data.layout);
      setValue("name", data.name);
      setValue("designation", data.designation);
      setValue("buttonText", data.buttonText);
      setValue("profileImageUrl", data.profileImageUrl);
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
export const saveHeroSettings = async (data: HeroFormValues) => {
  try {
    const trimmedData = {
      ...data,
      name: data?.name?.trim(),
      designation: data?.designation.trim(),
      buttonText: data?.buttonText?.trim(),
    };
    const token = getToken();

    const res = await fetch("/api/hero/save-settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // Include cookies if needed
      body: JSON.stringify(trimmedData),
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

export const handleFileChange = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setValue: UseFormSetValue<HeroFormValues>,
  setImageUploading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const token = getToken();

  const file = e.target.files?.[0];
  if (!file) {
    toast.error("No file selected");
    return;
  }

  try {
    setImageUploading(true);
    const response = await fetch("/api/file_upload/image_upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: file,
    });
    const data = await response.json();
    setImageUploading(false);
    setValue("profileImageUrl", data.url);
    toast.success("Image uploaded successfully!");
    
  if (!response.ok) {
      const errorData = await response.json();
      console.error("Upload failed:", errorData.error || "Unknown error");
      toast.error(errorData.error || "Upload failed");
    }
  } catch (err) {
    console.error("Upload failed:", err);
    setImageUploading(false);
  }
};
