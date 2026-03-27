import User from '../models/User.js';
import { registerValidator, loginValidator } from '../validators/userValidator.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';



// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {

    const { error } = registerValidator(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ error: 'User already exists with this email' });
    }

    const user = await User.create({ name, email, password });

    if (user) {
        generateTokenAndSetCookie(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {

    const { error } = loginValidator(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
        generateTokenAndSetCookie(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401).json({ error: 'Invalid email or password' });
    }

};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
export const logoutUser = async (req, res) => {

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc  Get user profile
// @route GET /api/auth/profile
export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ _id: user._id, name: user.name, email: user.email, createdAt: user.createdAt });
};

// @desc Update user profile
// @route PUT /api/auth/profile
export const updateUserProfile = async (req, res) => {
    const { name } = req.body;
    if (!name?.trim()) return res.status(400).json({ error: 'Name cannot be empty' });
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.name = name.trim();
    await user.save();
    res.status(200).json({ _id: user._id, name: user.name, email: user.email });
};

