import { makeAsyncTypes, asyncFetchMac } from "../Utils/";

export const asyncUser = makeAsyncTypes("user");

export const [setFetchPending, setFetchFulfilled, setFetchError] =
  asyncFetchMac(asyncUser);
