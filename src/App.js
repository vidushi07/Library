import "./App.css";
import BookFooter from "./components/BookFooter";
import PageNavbar from "./components/Navbar";
import Cart from "./components/Cart";
import { useEffect, useState, useContext } from "react";
import CategoryFilter from "./components/Category";
// import { sub } from "./utility/data";
import { database } from "./firebase_config";
import { BooksContext } from "./context/BookContext";
import LoginPage from "./components/LoginPage";
import { UserContext } from "./context/UserContext";

function App() {
  const [books, setBooks] = useContext(BooksContext);
  const [user, setUser] = useContext(UserContext);

  var docRef = database.collection("books").doc("CK10oqQent5h6rMDDmkn");

  const fetchBookData = async () => {
    await docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          const bookList = doc.data()["books"];
          console.log(bookList);
          setBooks(bookList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBookData();
  }, []);

  return (
    <div className="App">
      {!user ? (
        <LoginPage />
      ) : (
        <>
          <PageNavbar />
          <CategoryFilter />
          <Cart />
          <BookFooter />
        </>
      )}
    </div>
  );
}

export default App;
