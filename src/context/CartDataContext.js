import React, { useState, createContext } from "react";

// Create Context Object
export const CartDataContext = createContext();

// Create a provider for components to consume and subscribe to changes

export const CartDataContextProvider = props => {
  const [cartState, setCartState] = useState([]);

  return (
    <CartDataContext.Provider value={[cartState, setCartState]}>
      {props.children}
    </CartDataContext.Provider>
  );
};
