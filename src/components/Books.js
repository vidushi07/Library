import React, { useContext, useEffect, useState } from "react";
import { CartDataContext } from "../context/CartDataContext";
import { BooksContext } from "../context/BookContext";

function Books() {
  const [cartState, setCartState] = useContext(CartDataContext);
  const [books, setBooks] = useContext(BooksContext);

  const addtoCart = (e) => {
    const bookID = e.target.value;

    let item = books.find((product) => product.id == bookID);

    if (cartState.some((book) => book.id == item.id)) {
      const updatedCartState = cartState?.map((book) => {
        if (book.id == bookID) {
          return {
            ...book,
            quantity: book.quantity + 1,
          };
        }
        return book;
      });
      console.log('updating in cart')
      setCartState(updatedCartState);
    } else {
      let newItem = {};
      newItem.id = item.id;
      newItem.name = item.name;
      newItem.author = item.name;
      newItem.price = item.price;
      newItem.ratings = item.ratings;
      newItem.genre = item.genre;
      newItem.imageSrc = item.imageSrc;
      newItem.pages = item.pages;
      newItem.quantity = 1;
      setCartState([...cartState, newItem]);
      console.log('adding in cart')
    }

    const updatedBooks = books?.map((book) => {
      if (book.id == bookID) {
        return {
          ...book,
          quantity: book.quantity - 1,
        };
      }
      return book;
    });

    setBooks(updatedBooks);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {books?.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <div className="flex justify-center gap-2">
                <span className="mt-2 text-xs text-gray-700">
                  {product.author}
                </span>
                <span className="mt-2 text-xs text-gray-700">
                  {product.ratings}/5
                </span>
              </div>
              <div className="flex justify-center gap-2">
                <span className="mt-2 text-xs text-gray-700">
                  {product.genre}
                </span>
                <span className="mt-2 text-xs text-gray-700">
                  {product.pages} pages
                </span>
              </div>
              <span className="mt-2 text-xs text-red-800">
                <b>Only {product.quantity} left</b>
              </span>
              <div className="flex justify-center gap-2">
                <p className="mt-1 text-lg font-medium text-gray-900">
                  Rs {product.price}
                </p>
                {product.quantity != 0 && (
                  <button
                    onClick={addtoCart}
                    value={product.id}
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-md text-sm px-3 py-1 text-center mt-1"
                  >
                    +
                  </button>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Books;
