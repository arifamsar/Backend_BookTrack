const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateSampleBooks } = require("../utils/generateData");
const { validateRegistration, validateLogin } = require("../utils/validate");


class AuthController {
	async register(req, res) {
        const { username, password, email } = req.body;

        // Validate registration data
        const { errors, isValid } = validateRegistration(req.body);
        if (!isValid) {
            return res.status(400).json({ message: "Validation error", errors });
        }

        try {
            // Check if user already exists
            const existingUser = await User.findOne({
                $or: [{ username }, { email }],
            });

            if (existingUser) {
                return res.status(400).json({
                    message: "Validation error",
                    errors: {
                        username: existingUser.username === username ? "Username already exists" : undefined,
                        email: existingUser.email === email ? "Email already registered" : undefined,
                    },
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = new User({ username, password: hashedPassword, email });
            await newUser.save();

            // Generate sample books for the user
            await generateSampleBooks(newUser._id);

            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

	async login(req, res) {
        const { username, password } = req.body;

        // Validate login data
        const { errors, isValid } = validateLogin(req.body);
        if (!isValid) {
            return res.status(400).json({ message: "Validation error", errors });
        }

        try {
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(401).json({
                    message: "Authentication failed",
                    errors: {
                        username: "Username not found",
                    },
                });
            }

            // Compare the password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    message: "Authentication failed",
                    errors: {
                        password: "Invalid password",
                    },
                });
            }

            const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });

            res.status(200).json({ message: "Login successful", data: { token } });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
}

module.exports = AuthController;
