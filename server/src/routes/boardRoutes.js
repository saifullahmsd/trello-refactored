import express from 'express';
import { getBoards, createBoard, getBoardById, deleteBoard, inviteMember, updateBoardTitle, updateBoardDescription, updateBoardBackground } from '../controllers/boardController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getBoards)
    .post(createBoard);

router.route('/:id')
    .get(getBoardById)
    .delete(deleteBoard);

router.route('/:id/invite')
    .post(inviteMember)

router.route('/:id/title')
    .put(updateBoardTitle);

router.route('/:id/description')
    .put(updateBoardDescription);

router.route('/:id/background')
    .put(updateBoardBackground);

export default router;
