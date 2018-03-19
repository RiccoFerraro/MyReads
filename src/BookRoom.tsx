import "src/App.css";
import * as React from "react";
import BookRegistryModel from "models/BookRegistryModel";
import Bookshelf from "BookShelf"


interface BookRoomProps extends React.HTMLProps<BookRoomProps> {
    bookRegistry: BookRegistryModel;
    onUpdateBookShelf:  (bookId: string, shelf: string) => void;
}

class BookRoom extends React.Component<BookRoomProps, any> {
    public static bookRoomPageURL: string = "/";

    render() {
        let registry : BookRegistryModel = this.props.bookRegistry;
        return <div className="list-books-content">
            <div>
                {
                    this.getUniqueBookShelfNames()
                        .forEach((shelf: string) => {
                        return (
                            <Bookshelf onUpdateBookShelf = {this.props.onUpdateBookShelf}
                                       shelvedBooks = {registry.Books.filter((book) => {
                                           book.shelf === shelf
                                       })
                            }/>
                        )
                    })
                };
            </div>
        </div>;
    }

    private getUniqueBookShelfNames(): Array<string | undefined> {
        let allFoundBookShelfNames: Array<string | undefined> = this.props
            .bookRegistry.Books.map(
                (book) => book.shelf
            );

        return Array.from(new Set(allFoundBookShelfNames));
    }
}

export default BookRoom;
