import "src/App.css";
import * as React from "react";
import {History} from "history";
import {Route} from "react-router";
import BookRegistryModel from "models/BookRegistryModel";
import {RouteComponentProps} from "react-router";
import * as BooksAPI from "BooksAPI";
import BookModel from "models/BookModel";
import BookShelfModel from "models/BookShelfModel";

interface BookRoomProps extends React.HTMLProps<BookRoomProps> {
    bookRegistry: BookRegistryModel;
    onUpdateBookShelf:  (bookId: string, shelf: string) => void;
}

class BookRoom extends React.Component<BookRoomProps, any> {

    getUniqueBookShelfNames(): Array<string| undefined> {
        let allFoundBookShelfNames: Array<string| undefined> = this.props
            .bookRegistry.Books.map(
                (book) => book.shelf
            );

        return Array.from(new Set(allFoundBookShelfNames));
    }

    render() {
        return <div className="list-books-content">
            <div>
                {
                    this.getUniqueBookShelfNames()
                        .forEach((shelf: string) => {
                        return (
                            <BookShelf onUpdateBookShelf = {this.props.onUpdateBookShelf}/>
                        )
                    })
                };
            </div>
        </div>;
    }
}

export default BookRoom;
