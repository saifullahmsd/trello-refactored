import express from 'express';
import { getCards, createCard, updateCard, moveCard, deleteCard, assignMember, addComment, updateComment, deleteComment, deleteAttachment, addAttachment, updateAttachment, updateCardCover } from '../controllers/cardController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
    .post(createCard);


router.route('/:boardId')
    .get(getCards);

router.route('/:id')
    .put(updateCard)
    .delete(deleteCard);

router.route('/:id/move')
    .put(moveCard);

router.route('/:id/members')
    .put(assignMember);

router.route('/:id/comments')
    .post(addComment);

router.route('/:id/comments/:commentId')
    .put(updateComment)
    .delete(deleteComment);

router.route('/:id/attachments')
    .post(addAttachment);

router.route('/:id/attachments/:attachmentId')
    .delete(deleteAttachment)
    .put(updateAttachment);

router.route('/:id/cover')
    .put(updateCardCover);




export default router;
