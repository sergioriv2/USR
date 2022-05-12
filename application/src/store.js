import { createStore, applyMiddleware } from "redux";
import { reducers } from "./Reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for we
import { composeWithDevTools } from "redux-devtools-extension";
import { asyncMiddleware } from "./Middlewares/asyncMiddleware";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(asyncMiddleware))
);

export const persistor = persistStore(store);
