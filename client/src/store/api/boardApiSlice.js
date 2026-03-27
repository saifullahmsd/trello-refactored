import { apiSlice } from "../apiSlice";

const boardApiSlice = apiSlice.injectEndpoints(
    {
        endpoints: (builder) => ({
            getBoards: builder.query({
                query: () => '/api/boards',
                providesTags: ["board"]
            }),
            createBoard: builder.mutation({
                query: (boardData) => ({
                    url: '/api/boards',
                    method: 'POST',
                    body: boardData
                }),
                invalidatesTags: ['board']
            }),
            getBoardById: builder.query({
                query: (boardId) => `/api/boards/${boardId}`,
                providesTags: (result, error, id) => [{ type: "board", id }],
            }),
            deleteBoard: builder.mutation({
                query: (id) => ({
                    url: `/api/boards/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['board']
            }),
            inviteMember: builder.mutation({
                query: ({ boardId, email }) => ({
                    url: `/api/boards/${boardId}/invite`,
                    method: 'POST',
                    body: { email }
                }),
                invalidatesTags: (result, error, { boardId }) => [{ type: 'board', id: boardId }]
            }),
            updateBoardTitle: builder.mutation({
                query: ({ boardId, title }) => ({
                    url: `/api/boards/${boardId}/title`,
                    method: 'PUT',
                    body: { title }
                }),
                invalidatesTags: (result, error, { boardId }) => [{ type: 'board', id: boardId }]
            }),
            updateBoardDescription: builder.mutation({
                query: ({ boardId, description }) => ({
                    url: `/api/boards/${boardId}/description`,
                    method: 'PUT',
                    body: { description }
                }),
                invalidatesTags: (result, error, { boardId }) => [{ type: 'board', id: boardId }]
            }),
            getBoardActivity: builder.query({
                query: (boardId) => `/api/boards/${boardId}`,
                transformResponse: (response) => response.activity || [],
                providesTags: (result, error, id) => [{ type: 'board', id }],
            }),
            updateBoardBackground: builder.mutation({
                query: ({ boardId, backgroundLink, isImage }) => ({
                    url: `/api/boards/${boardId}/background`,
                    method: 'PUT',
                    body: { backgroundLink, isImage }
                }),
                invalidatesTags: (result, error, { boardId }) => [{ type: 'board', id: boardId }, 'board']
            }),
        })
    });

export const {
    useGetBoardsQuery,
    useCreateBoardMutation,
    useGetBoardByIdQuery,
    useDeleteBoardMutation,
    useInviteMemberMutation,
    useUpdateBoardTitleMutation,
    useUpdateBoardDescriptionMutation,
    useGetBoardActivityQuery,
    useUpdateBoardBackgroundMutation
} = boardApiSlice;
