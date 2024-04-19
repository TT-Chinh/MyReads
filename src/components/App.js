import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import '../css/App.css';
import Home from "./Home";
import SearchPage from "./SearchPage";
import * as BooksAPI from "../api/BooksAPI";

function App() {

  const [books, setBooks] = useState([])
  const [bookshelves, setBookshelves] = useState({})

  //get books shelf
  const getBooksShelf = (data) => {
    return {
      currentlyReading: {
          title: "Currently Reading",
          books: data.filter(book => book.shelf === "currentlyReading")
      },
      wantToRead: {
          title: "Want to Read",
          books: data.filter(book => book.shelf === "wantToRead")
      },
      read: {
          title: "Read",
          books: data.filter(book => book.shelf === "read")
      },
    }
  }
  
  // Call API get all books
  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll()
      setBooks(res)
    }

    getBooks()
  },[])

  //handle update book
  const handleUpdateBook = (book, shelf) => {
    let isExist = false;

    const tempBooks = books.map(x => {
      if(x.id === book.id){
        isExist = true
        x.shelf = shelf
      }
      return x
    })
    
    if(!isExist){
      book.shelf = shelf
      tempBooks.push(book)
    }
    setBooks(tempBooks)

    BooksAPI.update(book, shelf)
    .then(res => {
      setBookshelves(res)
    })
  }

  const getBookshelves = () => bookshelves;

  return (
    <Routes>
      <Route exact path="/" 
        element={
          <Home 
            booksShelf={getBooksShelf(books)} 
            handleUpdateBook={handleUpdateBook} 
          />} 
      />
      <Route path="/search" 
        element={
          <SearchPage 
            currentBookshelves={bookshelves} 
            handleUpdateBook={handleUpdateBook}
            getBookshelves={getBookshelves}
          />} 
      />
    </Routes>
  );
}

export default App;