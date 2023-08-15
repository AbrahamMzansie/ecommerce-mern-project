import { PRODUCTS_URL, UPLOADS_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const productsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({pageNumber}) => ({
        url: PRODUCTS_URL,
        params : {
          pageNumber,

        }
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),

    getPorductById: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      
      keepUnusedDataFor: 5,
    }),

    createNewProduct: builder.mutation({
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/review`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOADS_URL,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetPorductByIdQuery,
  useCreateNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadProductImageMutation,
  useCreateReviewMutation,
} = productsSlice;
