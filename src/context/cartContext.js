import React, { useState, createContext } from "react";

// Create Context Object
export const CartOpenContext = createContext();

// Create a provider for components to consume and subscribe to changes

export const CartOpenContextProvider = props => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartOpenContext.Provider value={[cartOpen, setCartOpen]}>
      {props.children}
    </CartOpenContext.Provider>
  );
};
