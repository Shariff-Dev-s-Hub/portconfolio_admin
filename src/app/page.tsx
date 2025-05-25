import LoginForm from "@/components/authentication/login";
import { connectDb } from "@/lib/mongodb";


export default async function  Home() {
  await connectDb();
  return (
   <LoginForm/>
  );
}
