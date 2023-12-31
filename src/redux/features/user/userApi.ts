import { api } from '@/redux/api/apiSlice';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: ({ accessToken }) => ({
        url: `/users/my-profile`,
        method: 'GET',
        headers: {
          Authorization: `${accessToken}`,
        },
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: 'POST',
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `/auth/signup`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetMyProfileQuery, useLoginMutation, useSignupMutation } =
  userApi;
