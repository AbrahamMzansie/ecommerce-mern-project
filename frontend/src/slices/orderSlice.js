import { ORDERS_URL , PAYPAL_URL} from "../constant";
import { apiSlice } from "./apiSlice";

export const orderSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}`,
        method: "POST",
        body: {...data},
      }),
      keepUnusedDataFor: 5,
    }),

    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),

    getAllOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),

    payOrder: builder.mutation({
        query: ({orderId , details}) => ({
          url: `${ORDERS_URL}/${orderId}/pay`,
          method: "PUT",
          body: {...details},
        }),
        keepUnusedDataFor: 5,
      }),

      updateOrderToDelivered: builder.mutation({
        query: (orderId) => ({
          url: `${ORDERS_URL}/${orderId}/delivered`,
          method: "PUT",         
        }),
        keepUnusedDataFor: 5,
      }),
      getPayPalClientID: builder.query({
        query: () => ({
          url: `${PAYPAL_URL}`,
        }),
        keepUnusedDataFor: 5,
      }),
  }),
});

export const {
  useCreateNewOrderMutation,
  useGetOrderDetailsQuery,
  useGetMyOrdersQuery,
  usePayOrderMutation,
  useGetPayPalClientIDQuery,
  useGetAllOrdersQuery,
  useUpdateOrderToDeliveredMutation,
} = orderSlice;
