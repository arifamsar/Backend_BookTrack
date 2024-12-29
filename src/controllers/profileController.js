const User = require('../models/users');

class ProfileController {
    async getProfile(req, res) {
        const userId = req.user.id;

        try {
            const user = await User.findById(userId).select('-password -createdAt -updatedAt -__v');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ data: user });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    async updateProfile(req, res) {
        const userId = req.user.id;
        const { username, email } = req.body;

        try {
            // Check if username or email already exists
            if (username) {
                const existingUsername = await User.findOne({ username, _id: { $ne: userId } });
                if (existingUsername) {
                    return res.status(400).json({ message: 'Username already taken' });
                }
            }

            if (email) {
                // Validate email format
                const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                if (!email.match(emailRegex)) {
                    return res.status(400).json({ message: 'Invalid email format' });
                }

                const existingEmail = await User.findOne({ email, _id: { $ne: userId } });
                if (existingEmail) {
                    return res.status(400).json({ message: 'Email already registered' });
                }
            }

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $set: { username, email } },
                { new: true }
            ).select('-password -createdAt -updatedAt -__v');

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({
                message: 'Profile updated successfully',
                data: updatedUser
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}

module.exports = new ProfileController();