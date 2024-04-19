import PropTypes from "prop-types";

const BookShelfChanger = ({ book, handleUpdateBook }) => {

    const hanldeShelfChange = (e) => {
        handleUpdateBook(book,e.target.value);
    }

    return (
        <div className="book-shelf-changer">
            <select onChange={hanldeShelfChange} defaultValue={book.shelf ?? "none"}>
                <option value="" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )
}

BookShelfChanger.propTypes = {
    book: PropTypes.object.isRequired,
    handleUpdateBook: PropTypes.func.isRequired,
}

export default BookShelfChanger;