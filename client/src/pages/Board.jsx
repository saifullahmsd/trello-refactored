import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { useGetBoardByIdQuery, useDeleteBoardMutation, useUpdateBoardTitleMutation, useUpdateBoardDescriptionMutation, useUpdateBoardBackgroundMutation } from '../store/api/boardApiSlice';
import { useGetListsQuery, useCreateListMutation, useReorderListsMutation } from '../store/api/listApiSlice';
import { useMoveCardMutation } from '../store/api/cardApiSlice';

import List from '../components/List/List';
import BoardHeader from '../components/Board/Header/BoardHeader';
import BoardDescription from '../components/Board/Description/BoardDescription';
import BoardDrawer from '../components/Board/Drawer/BoardDrawer';
import AddListForm from '../components/Board/AddList/AddListForm';
import InviteMemberModal from '../components/Boards/InviteMemberModal';

const BoardPage = () => {
    const { id: boardId } = useParams();
    const navigate = useNavigate();

    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [boardTitle, setBoardTitle] = useState('');
    const [boardDesc, setBoardDesc] = useState('');
    const [cardSearch, setCardSearch] = useState('');
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [activityOpen, setActivityOpen] = useState(false);

    const { data: board, isLoading: isBoardLoading } = useGetBoardByIdQuery(boardId, { pollingInterval: 20000 });
    const [deleteBoard] = useDeleteBoardMutation();
    const { data: lists, isLoading: isListsLoading } = useGetListsQuery(boardId);
    const [updateBoardTitle] = useUpdateBoardTitleMutation();
    const [updateBoardDescription] = useUpdateBoardDescriptionMutation();
    const [updateBoardBackground] = useUpdateBoardBackgroundMutation();
    const [createList] = useCreateListMutation();
    const [moveCard] = useMoveCardMutation();
    const [reorderLists] = useReorderListsMutation();

    const [localLists, setLocalLists] = useState([]);
    useEffect(() => { if (lists) setLocalLists(lists); }, [lists]);
    useEffect(() => {
        if (board?.title) setBoardTitle(board.title);
        if (board?.description !== undefined) setBoardDesc(board.description);
    }, [board]);

    const handleDeleteBoard = async () => {
        if (window.confirm('Are you sure you want to delete this board?')) {
            try { await deleteBoard(boardId).unwrap(); navigate('/dashboard'); }
            catch (err) { console.error('Failed to delete board:', err); }
        }
    };

    const handleUpdateTitle = async () => {
        if (!boardTitle.trim() || boardTitle === board.title) { setIsEditingTitle(false); return; }
        try { await updateBoardTitle({ boardId, title: boardTitle }).unwrap(); setIsEditingTitle(false); }
        catch (err) { console.error('Failed to update title:', err); setIsEditingTitle(false); }
    };

    const handleUpdateDescription = async (desc) => {
        try { await updateBoardDescription({ boardId, description: desc || boardDesc }).unwrap(); }
        catch (err) { console.error('Failed to update description:', err); }
    };

    const handleUpdateBackground = async (bgSelected) => {
        try { 
            await updateBoardBackground({ 
                boardId, 
                backgroundLink: bgSelected.link, 
                isImage: bgSelected.isImage 
            }).unwrap(); 
        }
        catch (err) { console.error('Failed to update background:', err); }
    };

    const handleAddList = async (title) => {
        try { await createList({ title, boardId }).unwrap(); }
        catch (err) { console.error('Failed to create list', err); }
    };

    const onDragEnd = async (result) => {
        const { destination, source, draggableId, type } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        // List reorder
        if (type === 'column') {
            const newOrder = Array.from(localLists);
            const [removed] = newOrder.splice(source.index, 1);
            newOrder.splice(destination.index, 0, removed);
            setLocalLists(newOrder);
            try { await reorderLists({ boardId, listIds: newOrder.map(l => l._id) }).unwrap(); }
            catch (err) { console.error('Failed to reorder lists:', err); setLocalLists(lists); }
            return;
        }

        // Card move
        try {
            await moveCard({ id: draggableId, destinationListId: destination.droppableId, newOrder: destination.index }).unwrap();
        } catch (error) { console.error('Failed to move card:', error); }
    };

    if (isBoardLoading || isListsLoading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 10 }} />;
    if (!board) return <Typography>Board not found</Typography>;

    return (
        <Box sx={{
            flexGrow: 1,
            minHeight: 'calc(100vh - 48px)',
            backgroundColor: board.isImage ? 'transparent' : (board.backgroundLink || board.background),
            backgroundImage: board.isImage ? `url(${board.backgroundLink || board.background})` : 'none',
            backgroundSize: 'cover', backgroundPosition: 'center',
            p: { xs: 1.5, sm: 2 },
            overflowX: 'auto',
            overflowY: { xs: 'auto', sm: 'hidden' },
        }}>
            <BoardHeader
                boardTitle={boardTitle || board.title}
                isEditingTitle={isEditingTitle}
                onTitleChange={setBoardTitle}
                onTitleSave={handleUpdateTitle}
                onTitleEditToggle={setIsEditingTitle}
                cardSearch={cardSearch}
                onSearchChange={setCardSearch}
                onInvite={() => setIsInviteOpen(true)}
                onActivity={() => setActivityOpen(true)}
                onDelete={handleDeleteBoard}
            />

            <BoardDescription description={board.description} onSave={handleUpdateDescription} />

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="all-lists" direction="horizontal" type="column">
                    {(provided) => (
                        <Box ref={provided.innerRef} {...provided.droppableProps}
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                height: { xs: 'auto', sm: 'calc(100vh - 180px)' },
                                pb: { xs: 2, sm: 0 }
                            }}>
                            {localLists?.map((list, index) => (
                                <List key={list._id} list={list} boardId={boardId} index={index} cardSearch={cardSearch} />
                            ))}
                            {provided.placeholder}
                            <AddListForm onAddList={handleAddList} />
                        </Box>
                    )}
                </Droppable>
            </DragDropContext>

            <BoardDrawer
                open={activityOpen} onClose={() => setActivityOpen(false)}
                board={board} boardDesc={boardDesc}
                onDescChange={setBoardDesc} onDescSave={handleUpdateDescription}
                onBackgroundChange={handleUpdateBackground}
            />

            <InviteMemberModal
                open={isInviteOpen} onClose={() => setIsInviteOpen(false)}
                boardId={boardId} currentMembers={board?.members || []}
            />
        </Box>
    );
};

export default BoardPage;
