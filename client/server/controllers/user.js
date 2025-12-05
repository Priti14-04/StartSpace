import User from "../models/User.js";
import md5 from "md5";
import jwt from "jsonwebtoken";

const postSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required" });
    }

    const nameValidation = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordValidation = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/;

    if (!nameValidation.test(name)) return res.status(400).json({ success: false, message: "Name should contain only alphabets and spaces" });
    if (!emailValidation.test(email)) return res.status(400).json({ success: false, message: "Email is not valid" });
    if (!passwordValidation.test(password)) return res.status(400).json({ success: false, message: "Password must have uppercase, lowercase, number, special character, 8-20 chars" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: `User with email ${email} already exists` });

    const newUser = new User({ name, email, password: md5(password) });
    const savedUser = await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Email and password required" });

    const existingUser = await User.findOne({ email, password: md5(password) }).select("_id name email");
    if (!existingUser) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email, name: existingUser.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ success: true, message: "Logged in successfully", user: existingUser, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { postSignup, postLogin };
