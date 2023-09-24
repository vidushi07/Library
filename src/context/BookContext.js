import React, { useState, createContext } from "react";
import { booksDict } from '../utility/data';

// Create Context Object
export const BooksContext = createContext();

// Create a provider for components to consume and subscribe to changes

export const BooksContextProvider = props => {
  const [books, setBooks] = useState([]);

  return (
    <BooksContext.Provider value={[books, setBooks]}>
      {props.children}
    </BooksContext.Provider>
  );
};
