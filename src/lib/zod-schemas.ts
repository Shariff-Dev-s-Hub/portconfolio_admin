import { z } from "zod";

export const heroSchema = z.object({
  layout: z.string().optional(),
  name: z.string().min(1, "Name is required"), // Added validation for required fields
  nameColor: z.string().optional(),
  designation: z.string().min(1, "Designation is required"), // Added validation for required fields
  designationColor: z.string().optional(),
  buttonText: z.string().optional(),
  buttonColor: z.string().optional(),
  backgroundColor: z.string().optional(),
  profileImageUrl: z.string().url("Invalid URL").optional(), // Added URL validation
  profileImageType: z.string().optional(),
});
