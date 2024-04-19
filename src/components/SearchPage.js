import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as BooksAPI from "../api/BooksAPI";
import BooksList from "./BooksList";

const SearchPage = ({ currentBookshelves, handleUpdateBook, getBookshelves }) => {

    const [query,setQuery] = useState('')
    const [searchBooks, setSearchBooks] = useState([])
    const [booksResult, setBooksResult] = useState([])
    const [bookshelves, setBookshelves] = useState(currentBookshelves)

    const mergerBookshelves = (bookshelves, books) => {
        const result = books?.map(book => {
            book.shelf = bookshelves.currentlyReading?.includes(book.id) ? "currentlyReading" :
            bookshelves.wantToRead?.includes(book.id) ? "wantToRead" :
            bookshelves.read?.includes(book.id) ? "read" : "none";

            return book;
        }) ?? [];
        setBooksResult(result);
    }

    const handleOnChangeQuery = (e) => {
        setQuery(e.target.value);
    }

    const handleUpdateBooksResult = (book, shelf) => {
        const tempBooks = booksResult.map(x => {
          if(x.id === book.id){
            x.shelf = shelf;
          }
          return x;
        });
        setBooksResult(tempBooks)
        handleUpdateBook(book,shelf);
        setBookshelves(getBookshelves())
    }

    useEffect(() => {
        let isMounted = true;
        
        if(query === ''){
            setBooksResult([]);
        }
        else{
            BooksAPI.search(query)
            .then(res => {
                setSearchBooks(res.error || !isMounted ? [] : res);
            });
        }

        return () => {
            isMounted = false;
        };
    },[query]);

    useEffect(() => {
        mergerBookshelves(bookshelves,searchBooks)
    },[searchBooks, bookshelves]);

    return (
        <div className="app">
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title, author, or ISBN"
                            value={query}
                            onChange={handleOnChangeQuery}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksList books={booksResult} handleUpdateBook={handleUpdateBooksResult} />
                </div>
            </div>
        </div>
    )
}

SearchPage.propTypes = {
    currentBookshelves: PropTypes.object.isRequired,
    handleUpdateBook: PropTypes.func.isRequired,
    getBookshelves: PropTypes.func.isRequired,
}

export default SearchPage;