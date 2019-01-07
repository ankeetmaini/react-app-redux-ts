import { AppActionObjectTypes } from "../actions/Actions";

type Todos = string[];

export default function TodosReducer(
  state: Todos = [],
  action: AppActionObjectTypes
): Todos {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload.req];
    case "REMOVE_TODOS":
      return [];
    default:
      return state;
  }
}
