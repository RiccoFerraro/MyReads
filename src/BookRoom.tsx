import "src/App.css";
import * as React from "react";
import BookRegistryModel from "models/BookRegistryModel";
import Bookshelf from "BookShelf"
import BookRepository from "utility/BookRepository"
import BookModel from "models/BookModel";

interface BookRoomProps extends React.HTMLProps<BookRoomProps> {
    bookRegistry: BookRegistryModel;
    onUpdateBookShelf:  (bookId: string, shelf: string) => void;
}

class BookRoom extends React.Component<BookRoomProps, any> {
    shelvesThatShouldAlwaysExist: Array<string> = ["currentlyReading", "read", "wantToRead"];

    constructor(props: BookRoomProps) {
        super(props);
    }
    public static bookRoomPageURL: string = "/";

    private get BookRegistry(): BookRegistryModel {
        return this.props.bookRegistry;
    }

    private get onUpdateBookShelf() : (bookId: string, shelf: string) => void {
        return this.props.onUpdateBookShelf;
    }

    private get possibleBookShelves() : Array<string | undefined> {
        let foundShelves = BookRepository.getUniqueBookShelfNames(this.BookRegistry.Books);
        let allShelvesWithRepeats = foundShelves.concat(this.shelvesThatShouldAlwaysExist);
        let uniqueShelves = new Set(allShelvesWithRepeats);
        return Array.from(uniqueShelves);
    }

    private filterBookRegistryByShelf(shelf: string): Array<BookModel> {
        return this.BookRegistry
            .Books.filter((book) => {
                book.shelf === shelf
            });
    }

    render() {
        return <div className="list-books-content">
            <div>
                {
                    this.possibleBookShelves.forEach((shelf: string) => {
                        return (
                            <Bookshelf
                                       shelvedBooks={this.filterBookRegistryByShelf(shelf)}
                                       possibleShelves={this.possibleBookShelves}
                                       onUpdateBookShelf={(bookId: string, shelf: string) => this.onUpdateBookShelf(bookId, shelf)}
                            />
                        )
                    })
                };
            </div>
        </div>;
    }


}

export default BookRoom;
