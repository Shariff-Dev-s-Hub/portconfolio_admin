import { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

export interface HeroFormValues {
  layout?: string;
  name: string;
  nameColor?: string;
  designation: string;
  designationColor?: string;
  buttonText?: string;
  buttonColor?: string;
  backgroundColor?: string;
  profileImageUrl?: string;
  profileImageType?: string;
}

export interface FormUtils {
  register: UseFormRegister<HeroFormValues>;
  watch: UseFormWatch<HeroFormValues>;
  handleSubmit: UseFormHandleSubmit<HeroFormValues>;
  errors: FieldErrors<HeroFormValues>;
  setValue: UseFormSetValue<HeroFormValues>;
}
