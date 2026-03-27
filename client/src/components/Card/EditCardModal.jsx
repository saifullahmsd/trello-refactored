import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Dialog, DialogContent, Grid, useMediaQuery, useTheme } from '@mui/material';
import {
    useUpdateCardMutation,
    useAssignMemberMutation,
    useDeleteCardMutation,
    useAddCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useAddAttachmentMutation,
    useUpdateAttachmentMutation,
    useDeleteAttachmentMutation,
    useUpdateCardCoverMutation
} from '../../store/api/cardApiSlice';
import { useGetBoardByIdQuery } from '../../store/api/boardApiSlice';

import CardHeader from './Header/CardHeader';
import CardMembersDisplay from './Members/CardMembersDisplay';
import CardLabelsDisplay from './Labels/CardLabelsDisplay';
import CardDatesDisplay from './Dates/CardDatesDisplay';
import CardDescription from './Description/CardDescription';
import CardAttachments from './Attachments/CardAttachments';
import CardCommentsList from './Comments/CardCommentsList';
import CardSidebar from './Sidebar/CardSidebar';
import Checklist from './Checklist/Checklist';
import LabelPicker from './Labels/LabelPicker';
import ChecklistPicker from './Checklist/ChecklistPicker';

const EditCardModal = ({ open, handleClose, card }) => {
    const { userInfo } = useSelector((state) => state.auth);
    const { data: board } = useGetBoardByIdQuery(card?.board);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [updateCard] = useUpdateCardMutation();
    const [assignMember] = useAssignMemberMutation();
    const [deleteCard] = useDeleteCardMutation();
    const [addComment] = useAddCommentMutation();
    const [updateComment] = useUpdateCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();
    const [addAttachment] = useAddAttachmentMutation();
    const [updateAttachment] = useUpdateAttachmentMutation();
    const [deleteAttachment] = useDeleteAttachmentMutation();
    const [updateCardCover] = useUpdateCardCoverMutation();

    const [labelAnchorEl, setLabelAnchorEl] = useState(null);
    const [checklistAnchorEl, setChecklistAnchorEl] = useState(null);

    if (!card) return null;

    const handleSaveDescription = async (desc) => {
        try { await updateCard({ id: card._id, description: desc }).unwrap(); }
        catch (err) { console.error('Failed to update description:', err); }
    };

    const handleToggleComplete = async () => {
        await updateCard({ id: card._id, date: { ...card.date, completed: !card.date.completed } });
    };

    const handleToggleMember = async (userId) => {
        try { await assignMember({ cardId: card._id, userId }).unwrap(); }
        catch (err) { console.error('Failed to toggle member:', err); }
    };

    const handleDeleteCard = async () => {
        if (window.confirm('Are you sure you want to delete this card?')) {
            try { await deleteCard(card._id).unwrap(); handleClose(); }
            catch (err) { console.error('Failed to delete card:', err); }
        }
    };

    const handleAddComment = async (text) => {
        try { await addComment({ cardId: card._id, boardId: card.board, text }).unwrap(); }
        catch (err) { console.error('Failed to add comment:', err); }
    };

    const handleUpdateComment = async (commentId, text) => {
        try { await updateComment({ cardId: card._id, boardId: card.board, commentId, text }).unwrap(); }
        catch (err) { console.error('Failed to update comment:', err); }
    };

    const handleDeleteComment = async (commentId) => {
        try { await deleteComment({ cardId: card._id, boardId: card.board, commentId }).unwrap(); }
        catch (err) { console.error('Failed to delete comment:', err); }
    };

    const handleAddAttachment = async (link, name) => {
        try { await addAttachment({ cardId: card._id, link, name }).unwrap(); }
        catch (err) { console.error('Failed to add attachment:', err); }
    };

    const handleUpdateAttachment = async (attId, link, name) => {
        try { await updateAttachment({ cardId: card._id, attachmentId: attId, link, name }).unwrap(); }
        catch (err) { console.error('Failed to update attachment:', err); }
    };

    const handleDeleteAttachment = async (attId) => {
        try { await deleteAttachment({ cardId: card._id, attachmentId: attId }).unwrap(); }
        catch (err) { console.error('Failed to delete attachment:', err); }
    };

    const handleUpdateCover = async (color) => {
        try { await updateCardCover({ cardId: card._id, color }).unwrap(); }
        catch (err) { console.error('Failed to update cover:', err); }
    };

    const handleSaveDate = async (type, value) => {
        const startDate = type === 'start' ? value : (card.date?.startDate ? new Date(card.date.startDate).toISOString().split('T')[0] : null);
        const dueDate = type === 'due' ? value : (card.date?.dueDate ? new Date(card.date.dueDate).toISOString().split('T')[0] : null);
        try {
            await updateCard({ id: card._id, date: { startDate, dueDate, completed: card.date?.completed || false } }).unwrap();
        } catch (err) { console.error('Failed to save date:', err); }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth fullScreen={fullScreen}>
            <CardHeader card={card} onClose={handleClose} />
            <DialogContent sx={{ bgcolor: '#f4f5f7', pt: 2, px: { xs: 1.5, sm: 3 } }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={9}>
                        <CardMembersDisplay card={card} board={board} />
                        <CardLabelsDisplay card={card} onAddLabel={(e) => setLabelAnchorEl(e.currentTarget)} />
                        <CardDatesDisplay card={card} onToggleComplete={handleToggleComplete} />
                        <CardDescription card={card} onSave={handleSaveDescription} />
                        {card.checklists?.length > 0 && (
                            card.checklists.map((checklist) => (
                                <Checklist key={checklist._id} checklist={checklist} card={card} />
                            ))
                        )}
                        <CardAttachments card={card} onAdd={handleAddAttachment}
                            onUpdate={handleUpdateAttachment} onDelete={handleDeleteAttachment} />
                        <CardCommentsList
                            card={card} userName={userInfo?.name} userId={userInfo?._id}
                            onAdd={handleAddComment} onUpdate={handleUpdateComment} onDelete={handleDeleteComment}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <CardSidebar
                            card={card} board={board}
                            onToggleMember={handleToggleMember}
                            onOpenLabels={(e) => setLabelAnchorEl(e.currentTarget)}
                            onOpenChecklist={(e) => setChecklistAnchorEl(e.currentTarget)}
                            onAddAttachment={handleAddAttachment}
                            onUpdateCover={handleUpdateCover}
                            onSaveDate={handleSaveDate}
                            onDeleteCard={handleDeleteCard}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <LabelPicker anchorEl={labelAnchorEl} handleClose={() => setLabelAnchorEl(null)} card={card} />
            <ChecklistPicker anchorEl={checklistAnchorEl} handleClose={() => setChecklistAnchorEl(null)} card={card} />
        </Dialog>
    );
};

export default EditCardModal;
