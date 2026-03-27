
import { useState } from 'react';
import { Paper, Typography, Box, Button, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useDeleteListMutation, useUpdateListTitleMutation } from '../../store/api/listApiSlice';
import { useGetCardsQuery, useCreateCardMutation } from '../../store/api/cardApiSlice';
import CardItem from './CardItem';

const List = ({ list, boardId, index, cardSearch }) => {
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState('');
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [listTitle, setListTitle] = useState(list.title);

    const [deleteList] = useDeleteListMutation();
    const [createCard] = useCreateCardMutation();
    const [updateListTitle] = useUpdateListTitleMutation();

    const { data: cards = [] } = useGetCardsQuery(boardId);

    const listCards = cards
        .filter((card) => card.list === list._id)
        .sort((a, b) => a.order - b.order)
        .filter((card) =>
            !cardSearch || card.title.toLowerCase().includes(cardSearch.toLowerCase())
        );

    const handleAddCard = async (e) => {
        e.preventDefault();
        if (!newCardTitle.trim()) return;
        try {
            await createCard({ title: newCardTitle, listId: list._id, boardId }).unwrap();
            setNewCardTitle('');
            setIsAddingCard(false);
        } catch (err) {
            console.error('Failed to create card', err);
        }
    };

    const handleUpdateTitle = async () => {
        if (!listTitle.trim() || listTitle === list.title) {
            setIsEditingTitle(false);
            return;
        }
        try {
            await updateListTitle({ listId: list._id, title: listTitle }).unwrap();
            setIsEditingTitle(false);
        } catch (err) {
            console.error('Failed to update list title:', err);
            setIsEditingTitle(false);
        }
    };

    return (
        <>
            <Draggable draggableId={list._id} index={index}>
                {(provided) => (
                    <Paper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        sx={{
                            width: { xs: '85vw', sm: 280, md: 300 },
                            minWidth: { xs: '85vw', sm: 280, md: 300 },
                            bgcolor: 'secondary.main',
                            p: 1.5, display: 'flex',
                            flexDirection: 'column',
                            maxHeight: '100%', mr: 2
                        }}
                    >
                        <Box {...provided.dragHandleProps}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 2
                            }}>
                            {isEditingTitle ? (
                                <TextField
                                    value={listTitle}
                                    onChange={(e) => setListTitle(e.target.value)}
                                    onBlur={handleUpdateTitle}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleUpdateTitle();
                                        if (e.key === 'Escape') setIsEditingTitle(false);
                                    }}
                                    autoFocus size="small" variant="standard"
                                    sx={{ fontWeight: 'bold' }}
                                />
                            ) : (
                                <Typography
                                    fontWeight="bold" sx={{ px: 1, cursor: 'pointer', '&:hover': { opacity: 0.7 } }}
                                    onClick={() => setIsEditingTitle(true)}
                                >
                                    {listTitle || list.title}
                                </Typography>
                            )}

                            <IconButton size="small" onClick={(e) => {
                                e.stopPropagation();
                                deleteList(list._id)
                            }}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        <Droppable droppableId={list._id} type="card">
                            {(provided, snapshot) => (
                                <Box
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    sx={{
                                        flexGrow: 1, overflowY: 'auto', px: 0.5, minHeight: '50px',
                                        backgroundColor: snapshot.isDraggingOver ? 'rgba(0,0,0,0.05)' : 'transparent',
                                        transition: 'background-color 0.2s ease',
                                    }}
                                >
                                    {listCards.map((card, index) => (
                                        <CardItem key={card._id} card={card} index={index} />
                                    ))}
                                    {provided.placeholder}
                                </Box>
                            )}
                        </Droppable>

                        {isAddingCard ? (
                            <form onSubmit={handleAddCard} style={{ marginTop: '8px' }}>
                                <TextField
                                    autoFocus fullWidth size="small" placeholder="Enter a title for this card..."
                                    value={newCardTitle} onChange={(e) => setNewCardTitle(e.target.value)}
                                    sx={{ bgcolor: 'white', borderRadius: 1 }}
                                />
                                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Button type="submit" variant="contained" size="small">Add</Button>
                                    <Button size="small" color="inherit" onClick={() => setIsAddingCard(false)}>Cancel</Button>
                                </Box>
                            </form>
                        ) : (
                            <Button
                                startIcon={<AddIcon />}
                                sx={{ mt: 1, justifyContent: 'flex-start', color: 'text.secondary' }}
                                onClick={() => setIsAddingCard(true)}
                            >
                                Add a card
                            </Button>
                        )}
                    </Paper>
                )}
            </Draggable>
        </>
    );
};

export default List;
