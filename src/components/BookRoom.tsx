import * as React from "react";
import {Link} from 'react-router-dom';
import BookRegistryModel from "models/BookRegistryModel";
import Bookshelf from "components/BookShelf"
import BookFactory from "utility/BookFactory"
import BookModel from "models/BookModel";
import SearchBooks from "components/SearchBooks";

interface BookRoomProps extends React.HTMLProps<BookRoomProps> {
    bookRegistry: BookRegistryModel;
    onUpdateBookShelf: (bookId: string, shelf: string) => void;
}

class BookRoom extends React.Component<BookRoomProps, any> {
    public static bookRoomPageURL: string = "/";


    constructor(props: BookRoomProps) {
        super(props);
    }

    private get BookRegistry(): BookRegistryModel {
        return this.props.bookRegistry;
    }

    private get possibleShelves(): Array<string | undefined> {
        let allShelves = BookFactory.getPossibleBookShelves(this.BookRegistry.Books);
        return allShelves.filter(shelf => (shelf != null && shelf != undefined && shelf !== ""))
    }

    private get onUpdateBookShelf(): (bookId: string, shelf: string) => void {
        return this.props.onUpdateBookShelf;
    }

    private filterBookRegistryByShelf(shelf: string): Array<BookModel> {
        return this.BookRegistry
            .Books.filter((book) => book.shelf === shelf);
    }

    render() {
        return (
            <div className="list-books-content">
                <div>
                    {this.possibleShelves.map((possibleShelf: string) => {
                        return (
                            <Bookshelf
                                key={possibleShelf}
                                title={possibleShelf}
                                shelvedBooks={this.filterBookRegistryByShelf(possibleShelf)}
                                possibleShelves={this.possibleShelves}
                                onUpdateBookShelf={(bookId: string, shelf: string) => this.onUpdateBookShelf(bookId,
                                    shelf)}
                            />
                        );
                    })
                    }
                </div>

                <Link className="open-search link" to={SearchBooks.searchBooksPageURL}>
                    Add a book
                </Link>
            </div>);
    }


}

export default BookRoom;
