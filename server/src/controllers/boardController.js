import Board from '../models/Board.js';
import User from '../models/User.js';
import { boardValidator } from '../validators/boardValidator.js';


// @desc    Get all boards for the logged-in user
// @route   GET /api/boards
export const getBoards = async (req, res) => {
    const boards = await Board.find({
        $or: [
            { user: req.user._id },
            { members: req.user._id }
        ]
    }).sort({ createdAt: -1 });
    res.status(200).json(boards);
};

// @desc    Create a new board
// @route   POST /api/boards
export const createBoard = async (req, res) => {

    const { error } = boardValidator(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { title, backgroundLink, isImage } = req.body;

    const board = await Board.create({
        title,
        backgroundLink: backgroundLink || '',
        background: backgroundLink || '#0079bf',
        isImage: isImage || false,
        user: req.user._id
    });

    res.status(201).json(board);
};

// @desc    Get a single board by ID
// @route   GET /api/boards/:id
export const getBoardById = async (req, res) => {
    // Allow board owner AND members to access board
    const board = await Board.findOne({
        _id: req.params.id,
        $or: [
            { user: req.user._id },
            { members: req.user._id }
        ]
    })
        .populate('members', 'name email')
        .populate('user', 'name email');

    if (!board) {
        return res.status(404).json({ error: 'Board not found' });
    }

    res.status(200).json(board);
};

// @desc    Delete a board
// @route   DELETE /api/boards/:id
export const deleteBoard = async (req, res) => {

    const board = await Board.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!board) {
        return res.status(404).json({ error: 'Board not found or unauthorized' });
    }

    res.status(200).json({ message: 'Board removed successfully' });

};

// @desc    Add a member to a board
// @route   POST /api/boards/:id/invite
export const inviteMember = async (req, res) => {
    const { email } = req.body;

    const board = await Board.findOne({ _id: req.params.id, user: req.user._id })
    if (!board) {
        return res.status(404).json({ error: 'Board not found or unauthorized' });
    }

    const userToInvite = await User.findOne({ email });
    if (!userToInvite) {
        return res.status(404).json({ error: 'User not found with this email ' });
    };

    if (board.members.includes(userToInvite._id)) {
        return res.status(400).json({ error: 'User is already a member of this board' });
    };

    if (userToInvite._id.toString() === req.user._id.toString()) {
        return res.status(400).json({ error: 'You are already the owner of this board' });
    };

    board.members.push(userToInvite._id);
    // Activity log
    board.activity.unshift({
        user: req.user.name,
        action: `invited ${userToInvite.name} to the board`,
        date: new Date()
    });
    if (board.activity.length > 20) board.activity = board.activity.slice(0, 20);

    await board.save();
    res.status(200).json({ message: 'Member invited successfully', board });

};

// @desc    Update board title
// @route   PUT /api/boards/:id/title
export const updateBoardTitle = async (req, res) => {
    const { title } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({ error: 'Title cannot be empty' });
    }

    const board = await Board.findOne({ _id: req.params.id, user: req.user._id });
    if (!board) {
        return res.status(404).json({ error: 'Board not found or unauthorized' });
    }

    board.title = title.trim();

    board.activity.unshift({
        user: req.user.name,
        action: `renamed the board to "${title.trim()}"`,
        date: new Date()
    });
    if (board.activity.length > 20) board.activity = board.activity.slice(0, 20);

    await board.save();

    res.status(200).json(board);
};

// @desc    Update board description
// @route   PUT /api/boards/:id/description
export const updateBoardDescription = async (req, res) => {
    const { description } = req.body;

    const board = await Board.findOne({ _id: req.params.id, user: req.user._id });
    if (!board) {
        return res.status(404).json({ error: 'Board not found or unauthorized' });
    }

    board.description = description || '';
    await board.save();

    res.status(200).json(board);
};

// @desc    Update board background
// @route   PUT /api/boards/:id/background
export const updateBoardBackground = async (req, res) => {
    const { backgroundLink, isImage } = req.body;

    const board = await Board.findOne({ _id: req.params.id, user: req.user._id });
    if (!board) {
        return res.status(404).json({ error: 'Board not found or unauthorized' });
    }

    board.backgroundLink = backgroundLink || '';
    board.background = backgroundLink || '#0079bf';
    board.isImage = isImage || false;

    board.activity.unshift({
        user: req.user.name,
        action: `changed the board background`,
        date: new Date()
    });
    if (board.activity.length > 20) board.activity = board.activity.slice(0, 20);

    await board.save();

    res.status(200).json(board);
};
