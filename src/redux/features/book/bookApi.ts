import { api } from '@/redux/api/apiSlice';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: ({ accessToken, data }) => ({
        url: `/books/add-book`,
        method: 'POST',
        headers: {
          Authorization: `${accessToken}`,
        },
        body: data,
      }),
    }),
  }),
});

export const { useAddBookMutation } = bookApi;
