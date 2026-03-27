import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        credentials: 'include',
        prepareHeaders: (headers) => {
            return headers;
        },
    }),
    tagTypes: ['User', 'Board', 'List', 'Card'],
    endpoints: (builder) => ({}),
});
