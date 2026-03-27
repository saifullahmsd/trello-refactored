import express from 'express';
import { getLists, createList, deleteList, updateListTitle, reorderLists } from '../controllers/listController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
    .post(createList);

router.route('/:boardId/reorder')
    .put(reorderLists);

router.route('/:boardId')
    .get(getLists);

router.route('/:id')
    .delete(deleteList);

router.route('/:id/title')
    .put(updateListTitle);


export default router;
