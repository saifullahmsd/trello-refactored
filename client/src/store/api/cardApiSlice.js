import { apiSlice } from '../apiSlice';

export const cardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCards: builder.query({
            query: (boardId) => `/api/cards/${boardId}`,
            providesTags: ['Card'],
        }),
        createCard: builder.mutation({
            query: (cardData) => ({
                url: '/api/cards',
                method: 'POST',
                body: cardData,
            }),
            invalidatesTags: ['Card'],
        }),
        updateCard: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/api/cards/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Card'],
        }),
        deleteCard: builder.mutation({
            query: (id) => ({
                url: `/api/cards/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Card'],
        }),
        moveCard: builder.mutation({
            query: ({ id, destinationListId, newOrder }) => ({
                url: `/api/cards/${id}/move`,
                method: 'PUT',
                body: { destinationListId, newOrder },
            }),
        }),
        assignMember: builder.mutation({
            query: ({ cardId, userId }) => ({
                url: `/api/cards/${cardId}/members`,
                method: 'PUT',
                body: { userId }
            }),
            invalidatesTags: ['Card']
        }),
        addComment: builder.mutation({
            query: ({ cardId, text }) => ({
                url: `/api/cards/${cardId}/comments`,
                method: 'POST',
                body: { text }
            }),
            invalidatesTags: (result, error, { boardId }) => [
                'Card',
                { type: 'board', id: boardId }
            ]
        }),
        updateComment: builder.mutation({
            query: ({ cardId, commentId, text }) => ({
                url: `/api/cards/${cardId}/comments/${commentId}`,
                method: 'PUT',
                body: { text }
            }),
            invalidatesTags: (result, error, { boardId }) => [
                'Card',
                { type: 'board', id: boardId }
            ]
        }),
        deleteComment: builder.mutation({
            query: ({ cardId, commentId }) => ({
                url: `/api/cards/${cardId}/comments/${commentId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { boardId }) => [
                'Card',
                { type: 'board', id: boardId }
            ]
        }),
        addAttachment: builder.mutation({
            query: ({ cardId, link, name }) => ({
                url: `/api/cards/${cardId}/attachments`,
                method: 'POST',
                body: { link, name }
            }),
            invalidatesTags: ['Card']
        }),
        updateAttachment: builder.mutation({
            query: ({ cardId, attachmentId, link, name }) => ({
                url: `/api/cards/${cardId}/attachments/${attachmentId}`,
                method: 'PUT',
                body: { link, name }
            }),
            invalidatesTags: ['Card']
        }),
        deleteAttachment: builder.mutation({
            query: ({ cardId, attachmentId }) => ({
                url: `/api/cards/${cardId}/attachments/${attachmentId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Card']
        }),
        updateCardCover: builder.mutation({
            query: ({ cardId, color }) => ({
                url: `/api/cards/${cardId}/cover`,
                method: 'PUT',
                body: { color }
            }),
            invalidatesTags: ['Card']
        }),
    }),
});

export const {
    useGetCardsQuery,
    useCreateCardMutation,
    useUpdateCardMutation,
    useDeleteCardMutation,
    useMoveCardMutation,
    useAssignMemberMutation,
    useAddCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useAddAttachmentMutation,
    useUpdateAttachmentMutation,
    useDeleteAttachmentMutation,
    useUpdateCardCoverMutation
} = cardApiSlice;
