import BookShelf from "./BookShelf";
import ButtonSearch from "./ButtonSearch";
import PropTypes from "prop-types";

const Home = ({ booksShelf, handleUpdateBook }) => {

    return (
        <div className="app">
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf bookShelf={booksShelf.currentlyReading} handleUpdateBook={handleUpdateBook} />
                        <BookShelf bookShelf={booksShelf.wantToRead} handleUpdateBook={handleUpdateBook} />
                        <BookShelf bookShelf={booksShelf.read} handleUpdateBook={handleUpdateBook} />
                    </div>
                </div>
                <ButtonSearch />
            </div>
        </div>
    )
}

Home.propTypes = {
    booksShelf: PropTypes.object,
    handleUpdateBook: PropTypes.func.isRequired,
}

export default Home;