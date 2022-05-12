import { makeAsyncTypes, asyncFetchMac } from "../Utils/";

export const asyncLoginUser = makeAsyncTypes("fetchUser");

export const [setFetchPending, setFetchFulfilled, setFetchError] =
  asyncFetchMac(asyncLoginUser);
