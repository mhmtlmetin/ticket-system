import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ticketApi } from "../services/tickets.service.js";
import {authApi} from "../services/auth.service.js"

export const store = configureStore({
  reducer: {
    [ticketApi.reducerPath]: ticketApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(ticketApi.middleware)
      .concat(authApi.middleware),
});
setupListeners(store.dispatch);
