import React, { useState, createContext } from "react";

// Create Context Object
export const SearchContext = createContext()

// Create a provider for components to consume and subscribe to changes

export const SearchContextProvider = props => {
  const [search, setSearch] = useState("")

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {props.children}
    </SearchContext.Provider>
  );
};
