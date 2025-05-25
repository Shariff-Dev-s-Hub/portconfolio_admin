import { generateTokenAndNavigate } from "../lib/utils.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

interface SignupRequestBody {
  email: string;
  password: string;
}

export const signup = async (req: Request<{}, {}, SignupRequestBody>, res: Response) => {
  const { email, password } = req.body;
  try {
    if ( !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate jwt token here
      generateTokenAndNavigate(newUser._id.toString());
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", (error as Error).message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

interface LoginRequestBody {
  email: string;
  password: string;
}

interface LoginRequest extends Request<{}, {}, LoginRequestBody> {}
interface LoginResponse extends Response {}

export const login = async (req: LoginRequest, res: LoginResponse) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateTokenAndNavigate(user._id.toString());

    res.status(200).json({
      _id: user._id,
      email: user.email,
    });
  } catch (error) {
    console.log("Error in login controller", (error as Error).message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

interface LogoutRequest extends Request {}
interface LogoutResponse extends Response {}

export const logout = (req: LogoutRequest, res: LogoutResponse) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", (error as Error).message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

interface CheckAuthRequest extends Request {
  user?: {
    _id: string;
    email: string;
  };
}

interface CheckAuthResponse extends Response {}

export const checkAuth = (req: CheckAuthRequest, res: CheckAuthResponse) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", (error as Error).message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};