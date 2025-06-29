import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldValues,
} from "react-hook-form";

export interface HeroFormValues {
  name: string;
  designation: string;
  backgroundColor: {
    is_active?: boolean;
    hex: string;
    rgb: { r: number; g: number; b: number; a: number };
  };
  heroImageUrl?: {
    is_active?: boolean;
    url?: string;
  };
  layout?: string;
  buttonText?: string;
  profileImageUrl?: string;
  nameColor?: string;
  designationColor?: string;
  buttonColor?: string;
}

export interface FormUtils<TFieldValues extends FieldValues = HeroFormValues> {
  register: UseFormRegister<TFieldValues>;
  watch: UseFormWatch<TFieldValues>;
  handleSubmit: UseFormHandleSubmit<TFieldValues>;
  errors?: FieldErrors<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
}
