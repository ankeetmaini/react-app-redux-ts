import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

interface Payload<U, V> {
  readonly req: U;
  readonly res: V;
}

export interface Action<T extends string, U, V> extends AnyAction {
  readonly type: T;
  readonly payload: Payload<U, V>;
}

export function createAction<T extends string, U, V>(
  type: T,
  req: U,
  res: V
): Action<T, U, V> {
  return {
    type,
    payload: {
      req,
      res
    }
  };
}

type API<U, V> = (args?: U) => Promise<V>;
export function createAsyncAction<
  A extends string,
  B extends string,
  C extends string,
  S,
  U,
  V
>(actions: [A, B, C], api: API<U, V>) {
  return (
    apiArgs?: U
  ): ThunkAction<
    Promise<Action<B, U | undefined, V> | void>,
    S,
    undefined,
    | Action<A, U | undefined, {}>
    | Action<B, U | undefined, V>
    | Action<C, U | undefined, any>
  > => dispatch => {
    const [requestType, successType, errorType] = actions;
    dispatch(createAction(requestType, apiArgs, {}));
    return Promise.resolve(api(apiArgs))
      .then(response => {
        const action = createAction(successType, apiArgs, response);
        dispatch(action);
        return action;
      })
      .catch(err => {
        const action = createAction(errorType, apiArgs, err);
        Promise.reject(dispatch(action));
      });
  };
}

type Enumerate<T> = T[keyof T];
export type ActionObjectTypes<T> = Enumerate<
  {
    [K in keyof T]: T[K] extends (
      args: any
    ) => ThunkAction<any, any, any, infer A>
      ? A
      : T[K] extends (args: any) => Action<any, any, any> // for normal createAction
      ? ReturnType<T[K]>
      : never
  }
>;

export type GetReducerState<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => infer Q ? Q : never
};

export type GetConnectDispatchPropsType<T> = {
  [P in keyof T]: T[P] extends (
    args?: infer U
  ) => ThunkAction<infer Q, any, any, any>
    ? (args?: U) => Q
    : T[P] extends (args: infer S) => infer R
    ? (args?: S) => R
    : never
};

export const INIT = "INIT";
export const LOADING = "LOADING";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";
export type asyncStatusTypes = "INIT" | "LOADING" | "SUCCESS" | "ERROR";
