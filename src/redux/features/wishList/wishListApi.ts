import { api } from '@/redux/api/apiSlice';

const wishListApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addWishList: builder.mutation({
      query: ({ accessToken, data }) => ({
        url: `/wish-list/add-book`,
        method: 'POST',
        headers: {
          Authorization: accessToken,
        },
        body: data,
      }),
      invalidatesTags: ['wish-list'],
    }),
    getWishList: builder.query({
      query: ({ accessToken, email }) => ({
        url: `/wish-list/${email}`,
        method: 'GET',
        headers: {
          Authorization: accessToken,
        },
      }),
      providesTags: ['wish-list'],
    }),
    removeFromWishList: builder.mutation({
      query: ({ email, bookId, accessToken }) => ({
        url: `/wish-list/${email}/${bookId}`,
        method: 'DELETE',
        headers: {
          Authorization: accessToken,
        },
      }),
      invalidatesTags: ['wish-list'],
    }),
  }),
});

export const {
  useAddWishListMutation,
  useGetWishListQuery,
  useRemoveFromWishListMutation,
} = wishListApi;
