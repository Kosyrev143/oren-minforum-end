// OrenApi.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OrenApi = createApi({
  reducerPath: "orenApi/api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    addUsers: builder.mutation({
      query: (body) => ({
        url: "api/user",
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: {
          surname: body.seName,
          name: body.name,
          middlename: body.midleName,
          email: body.email,
          phone: body.phoneNumber,
          organization: body.organization,
          post: body.post,
          district: body.rayon,
          events: body.selectedAnswers,
        },
      }),
    }),
    // Query to get users
    getUsers: builder.query({
      query: () => "api/user",
    }),
    // Query to get events
    getEvents: builder.query({
      query: () => "api/event",
    }),
    // Query to get bookings
    getBookings: builder.query({
      query: () => "api/bookings",
    }),
    exportUsersToExcel: builder.query({
      query: () => ({
        url: "api/user/export/users", // здесь меняем адрес
        method: "GET",
        responseType: "blob",
      }),
    }),
    exportEventsToExcel: builder.query({
      query: () => ({
        url: "api/user/export/events", // здесь меняем адрес
        method: "GET",
        responseType: "blob",
      }),
    }),
  }),
});

export const {
  useAddUsersMutation,
  useGetUsersQuery,
  useGetEventsQuery,
  useGetBookingsQuery,
  useExportUsersToExcelQuery
} = OrenApi;
