import { apiSlice } from '../apiSlice';

export const listApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLists: builder.query({
            query: (boardId) => `/api/lists/${boardId}`,
            providesTags: ['List'],
        }),
        createList: builder.mutation({
            query: (listData) => ({
                url: '/api/lists',
                method: 'POST',
                body: listData,
            }),
            invalidatesTags: ['List'],
        }),
        deleteList: builder.mutation({
            query: (id) => ({
                url: `/api/lists/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['List'],
        }),
        updateListTitle: builder.mutation({
            query: ({ listId, title }) => ({
                url: `/api/lists/${listId}/title`,
                method: 'PUT',
                body: { title }
            }),
            invalidatesTags: ['List']
        }),
        reorderLists: builder.mutation({
            query: ({ boardId, listIds }) => ({
                url: `/api/lists/${boardId}/reorder`,
                method: 'PUT',
                body: { listIds }
            }),
            invalidatesTags: ['List']
        }),
    }),
});

export const { useGetListsQuery, useCreateListMutation, useDeleteListMutation, useUpdateListTitleMutation, useReorderListsMutation } = listApiSlice;
