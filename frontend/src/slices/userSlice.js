import { USERS_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const usersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method : "POST",
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),

    logoutUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/logout`,
        method : "POST",
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),


    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/`,
        method : "POST",
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method : "PUT",
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
    
  }),
});

export const { useLoginMutation , useRegisterMutation , useLogoutUserMutation , useUpdateProfileMutation } = usersSlice;
