import { api } from '@/redux/api/apiSlice';

interface GetBooksParams {
  page?: number;
  limit?: number;
  title?: string;
  author?: string;
  genre?: string;
  publicationYear?: number;
  searchTerm?: string;
}

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: ({ accessToken, data }) => ({
        url: `/books/add-book`,
        method: 'POST',
        headers: {
          Authorization: accessToken,
        },
        body: data,
      }),
      invalidatesTags: ['books'],
    }),
    editBook: builder.mutation({
      query: ({ accessToken, data, id }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        headers: {
          Authorization: accessToken,
        },
        body: data,
      }),
      invalidatesTags: ['books'],
    }),
    addReview: builder.mutation({
      query: ({ id, review }) => ({
        url: `/books/`,
        method: 'PATCH',
        body: { book_id: id, review },
      }),
    }),
    deleteBook: builder.mutation({
      query: ({ id, accessToken }) => ({
        url: `/books/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: accessToken,
        },
      }),
      invalidatesTags: ['books'],
    }),
    getSingleBook: builder.query({
      query: ({ id }) => ({
        url: `/books/${id}`,
        method: 'GET',
      }),
    }),
    getBooks: builder.query({
      query: ({
        page,
        limit,
        title,
        author,
        genre,
        publicationYear,
        searchTerm,
      }: GetBooksParams) => {
        const params: GetBooksParams = {};

        if (page) {
          params.page = page;
        }

        if (limit) {
          params.limit = limit;
        }

        if (title) {
          params.title = title;
        }

        if (author) {
          params.author = author;
        }

        if (genre) {
          params.genre = genre;
        }

        if (publicationYear) {
          params.publicationYear = publicationYear;
        }

        if (searchTerm) {
          params.searchTerm = searchTerm;
        }

        return {
          url: `/books`,
          method: 'GET',
          params,
        };
      },
      providesTags: ['books'],
    }),
  }),
});

export const {
  useAddBookMutation,
  useGetBooksQuery,
  useGetSingleBookQuery,
  useAddReviewMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = bookApi;
