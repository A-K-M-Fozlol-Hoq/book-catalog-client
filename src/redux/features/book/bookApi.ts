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
        url: `/books/add-new-book`,
        method: 'POST',
        headers: {
          Authorization: accessToken,
        },
        body: data,
      }),
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
    }),
  }),
});

export const { useAddBookMutation, useGetBooksQuery, useGetSingleBookQuery } =
  bookApi;
