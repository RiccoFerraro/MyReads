import "src/App.css";
import * as React from "react";
import {History} from "history";
import {Route} from "react-router";
import BookRegistryModel from "models/BookRegistryModel";
import * as BooksAPI from "BooksAPI";
import BookModel from "models/BookModel";
import BookRoom from "BookRoom";
import BookShelfModel from "models/BookShelfModel";
import SearchPage from "src/components/myReads/SearchPage";


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

    // Everytime we fully mount this Component, get all the books.
    componentDidMount() {
        this.getAllBooks();
    }

    private getAllBooks() : void {
        BooksAPI.getAll()
            .then((books) => {
                let bookModels: Array<BookModel> = books.map(
                    (book)=> {
                        return MyReadsApplication.extractBook(book);
                });

                let bookRegistry: BookRegistryModel = {
                    Books: bookModels
                };

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

    private static extractBook(book) {
        let bookModel: BookModel = new BookModel();

        if (book.id) {
            bookModel.id = book.id
        }
        if (book.title) {
            bookModel.title = book.title
        }
        if (book.authors) {
            bookModel.authors = book.authors
        }
        if (book.imageLinks) {
            bookModel.imageLinks = {
                smallThumbnail: book.imageLinks.smallThumbnail,
                thumbnail: book.imageLinks.thumbnail
            }
        }
        return bookModel;
    }

    render() {
        return (
            <div className="MyReadsApp">
                <Route path={Bookshelves.getRoutePath()} exact render={
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
                                           onGetFullBookData={this.getFullBookData}/>
                    }
                }/>
            </div>
        );
    }



}

export default MyReadsApplication;