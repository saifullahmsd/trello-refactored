import { apiSlice } from '../apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/api/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: '/api/auth/register',
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/api/auth/logout',
                method: 'POST',
            })
        }),
        getProfile: builder.query({
            query: () => '/api/auth/profile',
            providesTags: ['Profile']
        }),
        updateProfile: builder.mutation({
            query: (data) => ({ url: '/api/auth/profile', method: 'PUT', body: data }),
            invalidatesTags: ['Profile']
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGetProfileQuery,
    useUpdateProfileMutation
} = authApiSlice;
