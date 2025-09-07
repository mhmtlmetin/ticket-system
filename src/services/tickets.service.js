import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ticketApi = createApi({
  reducerPath: "ticketApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    getAllTickets: builder.query({
      query: () => "requests",
    }),
    getTicket: builder.query({
      query: (id) => `requests/${id}`,
    }),

    createTicket: builder.mutation({
      query: (newTicket) => ({
        url: "requests",
        method: "POST",
        body: newTicket,
      }),
    }),
    getCommentsByRequestId: builder.query({
      query: (requestId) => `comments?requestId=${requestId}`,
      providesTags: (result, error, requestId) => [
        { type: "Comment", id: requestId },
      ],
    }),
    addComment: builder.mutation({
      query: (newComment) => ({
        url: "comments",
        method: "POST",
        body: newComment,
      }),
      invalidatesTags: (result, error, { requestId }) => [
        { type: "Comment", id: requestId },
      ],
    }),
     getUserByAuthorId: builder.query({
      query: (authorId) => `users?authorId=${authorId}`,
      providesTags: (result, error, authorId) => [
        { type: "User", id: authorId },
      ],
    }),
  }),
  refetchOnMountOrArgChange: 1,
});

export const {
  useGetAllTicketsQuery,
  useGetTicketQuery,
  useCreateTicketMutation,
  useGetCommentsByRequestIdQuery,
  useAddCommentMutation,
 useGetUserByAuthorIdQuery
} = ticketApi;
