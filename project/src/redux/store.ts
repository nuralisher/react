import { combineReducers, createStore } from "redux";
import authReducer from "./authReducer";
import chatsReducer from "./chatsReducer";
import groupReducer from "./groupReducer";
import userReducer from "./userReducer";

const allReducers = combineReducers({
    userReducer,
    chatsReducer,
    authReducer,
    groupReducer,
})
// const allReducers = combineReducers({
//   counter: counterReducer,
//   isLogged: loggedReducer,
// });


const store = createStore(allReducers);

export default store;