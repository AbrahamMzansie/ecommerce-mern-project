import { USERS_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const usersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: USERS_URL/login,
        method : "POST",
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),

    register: builder.mutation({
      query: (productId) => ({
        url: `${USERS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useLoginMutation , useRegisterMutation } = usersSlice;
