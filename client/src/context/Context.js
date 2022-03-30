import { createContext, useReducer } from "react";

// Reducers
import Reducer from "./Reducer.js";

const Context = createContext();

export const Provider = ({ children }) => {
  const initialState = {
    user: null,
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
