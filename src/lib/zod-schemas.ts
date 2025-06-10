import { z } from "zod";

export const heroSchema = z.object({
  layout: z.string().optional(),
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(20, "Name cannot exceed 20 characters"),
  nameColor: z.string().optional(),
  designation: z
    .string()
    .trim()
    .min(1, "Designation is required")
    .max(30, "Designation cannot exceed 20 characters"),
  designationColor: z.string().optional(),
  buttonText: z
    .string()
    .trim()
    .max(10, "Button text cannot exceed 15 characters")
    .optional(),
  buttonColor: z.string().optional(),
  backgroundColor: z.string().optional(),
  profileImageUrl: z.string().optional(),
});
