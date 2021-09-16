import React, { useReducer } from "react";
import Server from "../App/Server";

export interface Server {
    status: boolean;
    usage: number;
    id: number;
}

export type actionType =
    | {
          type: "set-status";
          payload: {
              id: number;
              status: boolean;
          };
      }
    | {
          type: "set-usage";
          payload: {
              id: number;
              usage: number;
          };
      }
    | { type: "shutdown-all" }
    | { type: "turn-on-all" };

const initialState = {
    servers: [
        {
            status: false,
            usage: 0,
            id: 0,
        },
        {
            status: false,
            usage: 0,
            id: 1,
        },
        {
            status: false,
            usage: 0,
            id: 2,
        },
        {
            status: false,
            usage: 0,
            id: 3,
        },
    ] as Server[],
};

const reducer = (state: typeof initialState, action: actionType) => {
    switch (action.type) {
        case "set-status":
            state.servers
                .filter((sv) => sv.id === action.payload.id)
                .forEach((sv) => (sv.status = action.payload.status));
            return {
                ...state,
            };
        case "set-usage":
            state.servers
                .filter((sv) => sv.id === action.payload.id)
                .forEach((sv) => (sv.usage = action.payload.usage));
            return { ...state };
        case "shutdown-all":
            state.servers.forEach((sv) => (sv.status = false));
            return { ...state };
        case "turn-on-all":
            state.servers.forEach((sv) => (sv.status = true));
            return { ...state };
        default:
            return { ...state };
    }
};

export const Store = React.createContext<{
    state: typeof initialState;
    dispatch: React.Dispatch<actionType>;
}>({
    state: initialState,
    dispatch: () => {},
});
export const StoreJSX = (props: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };

    return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
