import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: 'include'
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/",
                method: "POST",
                body: newOrder
            }),
            invalidatesTags: ["Orders"] // Ensures cache is updated after a new order
        }),
        getOrderByEmail: builder.query({
            query: (email) => ({
                url: `/email/${email}`
            }),
            providesTags: ["Orders"]
        })
    })
});

export const { useCreateOrderMutation, useGetOrderByEmailQuery } = ordersApi;
export default ordersApi;
