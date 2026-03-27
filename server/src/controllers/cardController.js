import Card from '../models/Card.js';
import List from '../models/List.js';
import Board from '../models/Board.js';
import User from '../models/User.js';
import { createCardValidator, updateCardValidator, moveCardValidator } from '../validators/cardValidator.js';

// @desc    Get all cards for a specific board
// @route   GET /api/cards/:boardId
export const getCards = async (req, res) => {
    const { boardId } = req.params;

    // Allow board owner AND members to get cards
    const board = await Board.findOne({
        _id: boardId,
        $or: [{ user: req.user._id }, { members: req.user._id }]
    });
    if (!board) return res.status(404).json({ error: 'Board not found' });

    const cards = await Card.find({ board: boardId }).sort({ order: 1 });
    res.status(200).json(cards);
};

// @desc    Create a new Card
// @route   POST /api/cards
export const createCard = async (req, res) => {

    const { error } = createCardValidator(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { title, listId, boardId } = req.body;

    const board = await Board.findOne({ _id: boardId, user: req.user._id });
    if (!board) return res.status(404).json({ error: 'Board not found or unauthorized' });

    const cardsInList = await Card.find({ list: listId });
    const newOrder = cardsInList.length;

    const card = await Card.create({
        title,
        list: listId,
        board: boardId,
        order: newOrder
    });

    res.status(201).json(card);

};

// @desc    Update Card text/description
// @route   PUT /api/cards/:id
export const updateCard = async (req, res) => {

    const { error } = updateCardValidator(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: 'Card not found' });

    const board = await Board.findOne({ _id: card.board, user: req.user._id });
    if (!board) return res.status(401).json({ error: 'Unauthorized to edit this card' });

    card = await Card.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true } // Return the updated document
    );

    res.status(200).json(card);
};

// @desc    Move/Reorder a Card
// @route   PUT /api/cards/:id/move
export const moveCard = async (req, res) => {

    const { error } = moveCardValidator(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { destinationListId, newOrder } = req.body;
    const cardToMove = await Card.findById(req.params.id);

    if (!cardToMove) return res.status(404).json({ error: 'Card not found' });

    const sourceListId = cardToMove.list;

    // If card stays in the SAME list, but order changes
    if (sourceListId.toString() === destinationListId.toString()) {
        if (cardToMove.order < newOrder) {
            // Moving Down
            await Card.updateMany(
                { list: sourceListId, order: { $gt: cardToMove.order, $lte: newOrder } },
                { $inc: { order: -1 } }
            );
        } else if (cardToMove.order > newOrder) {
            // Moving Up
            await Card.updateMany(
                { list: sourceListId, order: { $gte: newOrder, $lt: cardToMove.order } },
                { $inc: { order: 1 } }
            );
        }
    } else {
        // Card moves to a DIFFERENT list
        await Card.updateMany(
            { list: sourceListId, order: { $gt: cardToMove.order } },
            { $inc: { order: -1 } }
        );

        await Card.updateMany(
            { list: destinationListId, order: { $gte: newOrder } },
            { $inc: { order: 1 } }
        );
        cardToMove.list = destinationListId;
    }

    cardToMove.order = newOrder;
    await cardToMove.save();

    res.status(200).json(cardToMove);
};

// @desc    Delete a Card
// @route   DELETE /api/cards/:id
export const deleteCard = async (req, res) => {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: 'Card not found' });

    const board = await Board.findOne({ _id: card.board, user: req.user._id });
    if (!board) return res.status(401).json({ error: 'Unauthorized to delete this card' });

    await Card.updateMany(
        { list: card.list, order: { $gt: card.order } },
        { $inc: { order: -1 } }
    );

    await Card.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Card removed successfully' });

};


// @desc    Assign or remove a member from a card
// @route   PUT /api/cards/:id/members
export const assignMember = async (req, res) => {
    const { userId } = req.body;

    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: 'Card not found' });

    const board = await Board.findById(card.board)
        .populate('members', 'name email');
    if (!board) return res.status(404).json({ error: 'Board not found' });

    const isOwner = board.user.toString() === userId;
    const isBoardMember = board.members.some(m => m._id.toString() === userId);

    if (!isOwner && !isBoardMember) {
        return res.status(400).json({ error: 'User is not a member of this board' });
    }

    const alreadyAssigned = card.members.some(m => m.toString() === userId);

    if (alreadyAssigned) {
        card.members = card.members.filter(m => m.toString() !== userId);
    } else {
        card.members.push(userId);
    }

    await card.save();

    const updatedCard = await Card.findById(card._id).populate('members', 'name email');
    res.status(200).json(updatedCard);
};

// @desc    Add a comment to a card
// @route   POST /api/cards/:id/comments
export const addComment = async (req, res) => {
    const { text } = req.body;

    if (!text || !text.trim()) {
        return res.status(400).json({ error: 'Comment text cannot be empty' });
    }

    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: 'Card not found' });

    // Allow board owner AND invited members to comment
    const board = await Board.findOne({
        _id: card.board,
        $or: [{ user: req.user._id }, { members: req.user._id }]
    });
    if (!board) return res.status(401).json({ error: 'Unauthorized' });

    const newComment = {
        user: req.user._id,
        userName: req.user.name,
        text: text.trim(),
        date: new Date(),
        edited: false
    };

    card.comments.push(newComment);

    // Log to board activity
    board.activity = board.activity || [];
    board.activity.unshift({
        user: req.user.name,
        action: `commented on "${card.title}": "${text.trim().substring(0, 60)}${text.trim().length > 60 ? '...' : ''}"`,
        date: new Date()
    });
    if (board.activity.length > 50) board.activity = board.activity.slice(0, 50);

    await card.save();
    await board.save();

    res.status(201).json(card);
};

// @desc    Update a comment on a card
// @route   PUT /api/cards/:id/comments/:commentId
export const updateComment = async (req, res) => {
    const { text } = req.body;

    if (!text || !text.trim()) {
        return res.status(400).json({ error: 'Comment text cannot be empty' });
    }

    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: 'Card not found' });

    const comment = card.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (comment.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ error: 'You can only edit your own comments' });
    }

    comment.text = text.trim();
    comment.edited = true;
    await card.save();

    res.status(200).json(card);
};

// @desc    Delete a comment from a card
// @route   DELETE /api/cards/:id/comments/:commentId
export const deleteComment = async (req, res) => {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: 'Card not found' });

    const comment = card.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (comment.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ error: 'You can only delete your own comments' });
    }

    comment.deleteOne();
    await card.save();

    res.status(200).json(card);
};

// @desc    Add an attachment to a card
// @route   POST /api/cards/:id/attachments
export const addAttachment = async (req, res) => {
    const { link, name } = req.body;

    if (!link || !link.trim()) {
        return res.status(400).json({ error: 'Link cannot be empty' });
    }

    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: 'Card not found' });

    card.attachments.push({
        link: link.trim(),
        name: name?.trim() || '',
        date: new Date()
    });
    await card.save();

    res.status(201).json(card);
};

// @desc    Update an attachment
// @route   PUT /api/cards/:id/attachments/:attachmentId
export const updateAttachment = async (req, res) => {
    const { link, name } = req.body;

    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: 'Card not found' });

    const attachment = card.attachments.id(req.params.attachmentId);
    if (!attachment) return res.status(404).json({ error: 'Attachment not found' });

    if (link) attachment.link = link.trim();
    if (name !== undefined) attachment.name = name.trim();
    await card.save();

    res.status(200).json(card);
};

// @desc    Delete an attachment from a card
// @route   DELETE /api/cards/:id/attachments/:attachmentId
export const deleteAttachment = async (req, res) => {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: 'Card not found' });

    const board = await Board.findOne({ _id: card.board, user: req.user._id });
    if (!board) return res.status(401).json({ error: 'Unauthorized' });

    const attachment = card.attachments.id(req.params.attachmentId);
    if (!attachment) return res.status(404).json({ error: 'Attachment not found' });

    attachment.deleteOne();
    await card.save();

    res.status(200).json(card);
};

// @desc    Update card cover
// @route   PUT /api/cards/:id/cover
export const updateCardCover = async (req, res) => {
    const { color } = req.body;

    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: 'Card not found' });

    card.cover = { color: color || null };
    await card.save();

    res.status(200).json(card);
};




