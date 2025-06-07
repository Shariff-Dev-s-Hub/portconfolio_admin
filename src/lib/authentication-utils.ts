import { useRouter } from "next/navigation";

export const onLogout = (router: ReturnType<typeof useRouter>) => {
  localStorage.removeItem("jwt");
  router.replace("/");
};
