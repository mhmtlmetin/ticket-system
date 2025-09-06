import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    login: builder.query({
      query: ({ username, password }) =>
        `/users?username=${username}&password=${password}`,
    }),
  }),
});

export const { useLazyLoginQuery } = authApi;
