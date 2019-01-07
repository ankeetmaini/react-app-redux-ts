import {
  createAction,
  createAsyncAction,
  ActionObjectTypes
} from "../utils/actionCreatorTypes";
import * as types from "./ActionTypes";
import DogApi from "../api/DogApi";

const AppActions = {
  addTodo: (text: string) => createAction(types.ADD_TODO, text, {}),
  removeTodos: () => createAction(types.REMOVE_TODOS, {}, {}),
  clearDoggo: () => createAction(types.CLEAR_DOGGO, {}, {}),

  getDoggo: createAsyncAction(
    [types.GET_DOGGO_REQUEST, types.GET_DOGGO_SUCCESS, types.GET_DOGGO_ERROR],
    DogApi.getDoggo
  )
};

export default AppActions;
export type AppActionObjectTypes = ActionObjectTypes<typeof AppActions>;
