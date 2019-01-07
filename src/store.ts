import reducer, { AppState } from "./reducers";
import { createStore, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { AppActionObjectTypes } from "./actions/Actions";

export default createStore(
  reducer,
  applyMiddleware(thunk as ThunkMiddleware<AppState, AppActionObjectTypes>)
);
