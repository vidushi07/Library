import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/searchContext";
import { BooksContext } from "../context/BookContext";
import { booksDict } from "../utility/data";

function Search() {
  const [search, setSearch] = useContext(SearchContext);
  const [books, setBooks] = useContext(BooksContext);
  const [resultCount, setResultCount] = useState(0);
  
  useEffect(()=> {
    setResultCount(books.length)
  }, [books])

  useEffect(()=>{
    showSearchedResult()
  }, [search])

  const showSearchedResult = (e) => {
    const searchTerm = search.toLowerCase();
    if (searchTerm == "") {
      setBooks(booksDict);
    } else {
      let res = books.filter(
        (book) =>
          book.name.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm) ||
          book.genre.toLowerCase().includes(searchTerm)
      );
      setBooks(res);
    }
  };

  return (
    <form>
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Books, authors, genre..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button
          type="submit"
          class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>

      <span className="mt-2 text-xs text-gray-700 flex justify-end italic">{resultCount} results found</span>
    </form>
  );
}

export default Search;
