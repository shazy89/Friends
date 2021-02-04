import { combineReducers } from "redux";
import auth from "./auth";
import users from "./users";
import selectedFriend from "./selectedFriend";
import chat from "./chat";

export default combineReducers({
  auth,
  users,
  selectedFriend,
  chat,
});
