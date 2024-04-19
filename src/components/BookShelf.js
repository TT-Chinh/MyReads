import PropTypes from "prop-types";
import BooksList from "./BooksList";

const BookShelf = ({ bookShelf, handleUpdateBook }) => {

    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{bookShelf.title}</h2>
          <div className="bookshelf-books">
            <BooksList books={bookShelf.books} handleUpdateBook={handleUpdateBook} />
          </div>
        </div>
    )
}

BookShelf.propTypes = {
    bookShelf: PropTypes.object,
    handleUpdateBook: PropTypes.func.isRequired,
}

export default BookShelf;