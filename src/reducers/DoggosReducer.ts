import {
  asyncStatusTypes,
  LOADING,
  SUCCESS,
  INIT
} from "../utils/actionCreatorTypes";
import { DoggoResponse } from "../models/DogResponse";
import { AppActionObjectTypes } from "../actions/Actions";

interface Doggos {
  asyncStatus: asyncStatusTypes;
  doggos: DoggoResponse[];
}
const initialState: Doggos = {
  asyncStatus: INIT,
  doggos: []
};
export default function DoggosReducer(
  state: Doggos = initialState,
  action: AppActionObjectTypes
): Doggos {
  switch (action.type) {
    case "GET_DOGGO_REQUEST":
      return { ...state, asyncStatus: LOADING };

    case "GET_DOGGO_SUCCESS":
      return { asyncStatus: SUCCESS, doggos: [action.payload.res] };

    case "CLEAR_DOGGO":
      return initialState;
    default:
      return state;
  }
}
