import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { SearchContextProvider } from "./context/searchContext";
import { CartOpenContextProvider } from "./context/cartContext";
import { CartDataContextProvider } from "./context/CartDataContext";
import { BooksContextProvider } from "./context/BookContext";
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
    <BooksContextProvider>
      <CartDataContextProvider>
        <SearchContextProvider>
          <CartOpenContextProvider>
            <App />
          </CartOpenContextProvider>
        </SearchContextProvider>
      </CartDataContextProvider>
    </BooksContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
