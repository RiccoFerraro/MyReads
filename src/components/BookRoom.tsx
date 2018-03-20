import "src/App.css";
import * as React from "react";
import BookRegistryModel from "models/BookRegistryModel";
import Bookshelf from "components/BookShelf"
import BookFactory from "utility/BookFactory"
import BookModel from "models/BookModel";

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
        return BookFactory.getPossibleBookShelves(this.BookRegistry.Books);
    }

    private get onUpdateBookShelf() : (bookId: string, shelf: string) => void {
        return this.props.onUpdateBookShelf;
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
                    this.possibleShelves.forEach((possibleShelf: string) => {
                        return (
                            <Bookshelf
                                       title={possibleShelf}
                                       shelvedBooks={this.filterBookRegistryByShelf(possibleShelf)}
                                       possibleShelves={BookFactory.getPossibleBookShelves(this.BookRegistry.Books)}
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
