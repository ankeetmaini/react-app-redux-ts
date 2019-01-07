import todos from "./TodosReducer";
import doggos from "./DoggosReducer";
import { combineReducers } from "redux";
import { GetReducerState } from "../utils/actionCreatorTypes";

const reducers = {
  todos,
  doggos
};

export type AppState = GetReducerState<typeof reducers>;
export default combineReducers<AppState>(reducers);
