import List from '../models/List.js';
import Board from '../models/Board.js';
import { listValidator } from '../validators/listValidator.js';

// @desc    Get all lists for a specific board
// @route   GET /api/lists/:boardId
export const getLists = async (req, res) => {
    const { boardId } = req.params;

    // Allow board owner AND members to get lists
    const board = await Board.findOne({
        _id: boardId,
        $or: [{ user: req.user._id }, { members: req.user._id }]
    });
    if (!board) {
        return res.status(404).json({ error: 'Board not found or unauthorized' });
    }

    const lists = await List.find({ board: boardId }).sort({ order: 1 });
    res.status(200).json(lists);
};

// @desc    Create a new list on a board
// @route   POST /api/lists
export const createList = async (req, res) => {

    const { error } = listValidator(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { title, boardId } = req.body;

    const board = await Board.findOne({ _id: boardId, user: req.user._id });
    if (!board) {
        return res.status(404).json({ error: 'Board not found or unauthorized' });
    }

    const lists = await List.find({ board: boardId });
    const newOrder = lists.length > 0 ? lists.length : 0;

    const list = await List.create({
        title,
        board: boardId,
        order: newOrder
    });

    res.status(201).json(list);

};

// @desc    Delete a list
// @route   DELETE /api/lists/:id
export const deleteList = async (req, res) => {

    const list = await List.findById(req.params.id);
    if (!list) {
        return res.status(404).json({ error: 'List not found' });
    }

    const board = await Board.findOne({ _id: list.board, user: req.user._id });
    if (!board) {
        return res.status(404).json({ error: 'Unauthorized to delete this list' });
    }

    await List.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'List removed successfully' });
};

// @desc    Update list title
// @route   PUT /api/lists/:id/title
export const updateListTitle = async (req, res) => {
    const { title } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({ error: 'Title cannot be empty' });
    }

    const list = await List.findById(req.params.id);
    if (!list) return res.status(404).json({ error: 'List not found' });

    const board = await Board.findOne({ _id: list.board, user: req.user._id });
    if (!board) return res.status(401).json({ error: 'Unauthorized' });

    list.title = title.trim();
    await list.save();

    res.status(200).json(list);
};
// @desc    Reorder lists on a board
// @route   PUT /api/lists/:boardId/reorder
export const reorderLists = async (req, res) => {
    const { listIds } = req.body;

    const board = await Board.findOne({ _id: req.params.boardId, user: req.user._id });
    if (!board) return res.status(401).json({ error: 'Unauthorized' });

    await Promise.all(listIds.map((id, index) =>
        List.findByIdAndUpdate(id, { order: index })
    ));

    const lists = await List.find({ board: req.params.boardId }).sort({ order: 1 });
    res.status(200).json(lists);
};


