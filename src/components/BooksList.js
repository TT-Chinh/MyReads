import PropTypes from "prop-types";
import Book from "./Book";

const BooksList = ({ books, handleUpdateBook }) => {

    return (
        <ol className="books-grid">
            {books.map(book => <Book key={book.id} book={book} handleUpdateBook={handleUpdateBook} />)}
        </ol>
    )
}

BooksList.propTypes = {
    books: PropTypes.array,
    handleUpdateBook: PropTypes.func.isRequired,
}

export default BooksList;