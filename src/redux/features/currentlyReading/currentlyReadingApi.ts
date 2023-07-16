import { api } from '@/redux/api/apiSlice';

const currentlyReadingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addCurrentlyReading: builder.mutation({
      query: ({ accessToken, data }) => ({
        url: `/currently-reading/add-book`,
        method: 'POST',
        headers: {
          Authorization: accessToken,
        },
        body: data,
      }),
      invalidatesTags: ['currently-reading'],
    }),
    getCurrentlyReading: builder.query({
      query: ({ accessToken, email }) => ({
        url: `/currently-reading/${email}`,
        method: 'GET',
        headers: {
          Authorization: accessToken,
        },
      }),
      providesTags: ['currently-reading'],
    }),
    editCurrentlyReading: builder.mutation({
      query: ({ accessToken, data }) => ({
        url: `/currently-reading`,
        method: 'PATCH',
        headers: {
          Authorization: accessToken,
        },
        body: data,
      }),
      invalidatesTags: ['currently-reading'],
    }),
    removeFromCurrentlyReading: builder.mutation({
      query: ({ email, bookId, accessToken }) => ({
        url: `/currently-reading/${email}/${bookId}`,
        method: 'DELETE',
        headers: {
          Authorization: accessToken,
        },
      }),
      invalidatesTags: ['currently-reading'],
    }),
  }),
});

export const {
  useAddCurrentlyReadingMutation,
  useGetCurrentlyReadingQuery,
  useEditCurrentlyReadingMutation,
  useRemoveFromCurrentlyReadingMutation,
} = currentlyReadingApi;
