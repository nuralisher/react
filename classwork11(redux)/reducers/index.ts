import { combineReducers } from "redux";
import counterReducer from "./CounterReducer";
import loggedReducer from "./LoggedReducer";

const allReducers = combineReducers({
  counter: counterReducer,
  isLogged: loggedReducer,
});

export default allReducers;
