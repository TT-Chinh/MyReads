import PropTypes from  "prop-types";
import BookShelfChanger from "./BookShelfChanger";

const Book = ({ book, handleUpdateBook}) => {

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 192,
                        backgroundImage: `url("${book.imageLinks.thumbnail}")`,
                    }}
                    ></div>
                    <BookShelfChanger book={book} handleUpdateBook={handleUpdateBook} />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors?.join(', ') ?? ""}</div>
            </div>
        </li>
    )
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    handleUpdateBook: PropTypes.func.isRequired,
}

export default Book;