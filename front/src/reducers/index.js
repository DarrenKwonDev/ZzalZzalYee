import { combineReducers } from "redux";
import global from "./global";
import user from "./user";

const rootReducer = combineReducers({
  global,
  user,
});

export default rootReducer;
