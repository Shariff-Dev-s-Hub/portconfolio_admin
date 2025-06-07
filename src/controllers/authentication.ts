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
      toast.error("Login Required");
      throw new Error("Login Required");
    }
    const data = await res.json();
    console.log("Authenticated user data:", data);

    return data;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return null;
  }
};

// interface LogoutRequest extends Request {}
// interface LogoutResponse extends Response {}

// export const logout = (req: LogoutRequest, res: LogoutResponse) => {
//   try {
//     res.cookie("jwt", "", { maxAge: 0 });
//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     console.log("Error in logout controller", (error as Error).message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// interface CheckAuthRequest extends Request {
//   user?: {
//     _id: string;
//     email: string;
//   };
// }

// interface CheckAuthResponse extends Response {}

// export const checkAuth = (req: CheckAuthRequest, res: CheckAuthResponse) => {
//   try {
//     res.status(200).json(req.user);
//   } catch (error) {
//     console.log("Error in checkAuth controller", (error as Error).message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
