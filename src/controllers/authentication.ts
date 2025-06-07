import toast from "react-hot-toast";
interface SignupCredentials {
  email: string;
  password: string;
}
export const signup = async (credentials: SignupCredentials) => {
  const { email, password } = credentials;
  // const router = useRouter();

  if (!email.trim() || !password.trim()) {
    toast.error("Please provide all fields");
    return;
  }

  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Signup failed");
      return;
    }

    toast.success("Signup successful");
    // router.push("/dashboard");
  } catch (err) {
    console.error("Error during signup:", err);
    toast.error("Something went wrong");
  }
};

export const login = async (credentials: SignupCredentials) => {
  const { email, password } = credentials;
  if (!email.trim() || !password.trim()) {
    toast.error("Please provide all fields");
    return;
  }
  try {
    const res = await fetch("/api/auth/login ", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Login failed");
      return;
    }

    toast.success("Login successful");
    localStorage.setItem("jwt", JSON.stringify(data?.token));
    return data;
  } catch (err) {
    console.error("Error during login:", err);
    toast.error("Something went wrong");
  }
};

export const checkAuth = async () => {
  try {
    const res = await fetch("/api/auth/authenticate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    if (!res.ok) {
      throw new Error("Login Required");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return null;
  }
};
