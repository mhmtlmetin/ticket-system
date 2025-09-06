
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const ticketApi = createApi({
  reducerPath: 'ticketApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (builder) => ({
    getAllTickets: builder.query({
      query: () => 'requests',
    }),

    createTicket: builder.mutation({
      query: (newTicket)=> ({
        url:'requests',
        method: 'POST',
        body: newTicket
      })
    }),

  }),
  refetchOnMountOrArgChange:1
})


export const { useGetAllTicketsQuery } = ticketApi