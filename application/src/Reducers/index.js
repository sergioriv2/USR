import { combineReducers } from "redux";
import { asyncLoginUser } from "../Actions/loginActions";
import { asyncUser } from "../Actions/userActions";
import {
  makeFetchingReducer,
  makeUserReducer,
  makeCareerReducer,
  makeLogoutReducer,
} from "../Utils";

const signInReducer = makeFetchingReducer(asyncLoginUser);
const userReducer = makeUserReducer(asyncUser);
const careerReducer = makeCareerReducer();
const logoutReducer = makeLogoutReducer();

export const reducers = combineReducers({
  fetchToken: signInReducer,
  user: userReducer,
  career: careerReducer,
  logout: logoutReducer,
});
