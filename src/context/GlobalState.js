import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import { v4 as uuid } from 'uuid';

// Initial State
const initialState = {
  transactions: [
    { id: uuid(), text: 'Credit card', amount: -2000 },
    { id: uuid(), text: 'Tax refund', amount: 30000 }
  ]
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  const addTransaction = transaction => {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  };

  const deleteTransaction = id => {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        addTransaction,
        deleteTransaction
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
