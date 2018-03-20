import "src/App.css";
import * as React from "react";
import {History} from "history";
import {Route} from "react-router";
import BookRegistryModel from "models/BookRegistryModel";
import * as BooksAPI from "utility/BooksAPI";
import BookModel from "models/BookModel";
import BookRoom from "components/BookRoom";
import BookShelfModel from "models/BookShelfModel";
import SearchPage from "src/components/myReads/SearchPage";
import BookRepository from "utility/BookRepository"


interface MyReadsAppState {
    bookRegistry: BookRegistryModel
}

class MyReadsApplication extends React.Component<any, MyReadsAppState> {
    constructor(props: any, context: MyReadsAppState) {
        super(props, context);

        // Initialize the state.
        this.state = {
            bookRegistry: {
                Books: []
            }
        };
    }

    // Every time we fully mount this Component, get all the books.
    componentDidMount() {
        this.getAllBooks();
    }

    private getAllBooks() : void {
        BookRepository.getAllBooks()
            .then((books) => {
                let bookRegistry: BookRegistryModel = {
                    Books: books
                };

                // This will cause a re-render, which in turn forces any child Component who uses this.state to re-evaluate/render itself.
                this.setState((state: MyReadsAppState) => {
                    state.bookRegistry = bookRegistry;
                    return state;
                });
            });
    }

    // We are depending on the fact that if a Book is not on a shelf, it's shelf will be blank, empty, or null.
    private updateBookShelf(bookId: string, shelf: string): void {
        BooksAPI.update(bookId, shelf)
            .then((data) => {
               this.setState((state: MyReadsAppState) => {
                   let book = state.bookRegistry.Books
                       .find((book) => book.id === bookId);

                   if(book) {
                       book.shelf = shelf;
                   }

                   return state;
               })
            });

    }



    render() {
        return (
            <div className="MyReadsApp">
                <Route path={BookRoom.bookRoomPageURL} exact render={
                    (props) => {
                        return (
                            <BookRoom bookRegistry={this.state.bookRegistry}
                                        onUpdateBookShelf={ (bookId: string, shelf: string) => this.updateBookShelf(bookId, shelf)} />
                        );
                    }
                }/>
                <Route path={SearchPage.getRoutePath()} render={
                    (props) => {
                        return <SearchPage onClose={() => { props.history.push(""); }}
                                           onUpdateBookShelf={(bookId: string, shelf: string) => this.updateBookShelf(bookId, shelf)}
                                           onGetFullBookData={this.getFullBookData()}/>
                    }
                }/>
            </div>
        );
    }



}

export default MyReadsApplication;