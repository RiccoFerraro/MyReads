import * as React from "react";
import BookRegistryModel from "models/BookRegistryModel";
import Book from "components/Book"
import * as BooksAPI from "utility/BooksAPI"

import BookRepository, {default as BookFactory} from "utility/BookFactory"
import BookModel from "models/BookModel";
import {string} from "prop-types";

interface SearchBooksProps extends React.HTMLProps<SearchBooksProps> {
    onUpdateBookShelf: (bookId: string, shelf: string) => void;
    onCloseSearch: () => void;
    shelvedBooksRegistry: BookRegistryModel;
}

interface SearchBooksState {
    bookRegistry: BookRegistryModel;
    query: string;
    haveEnteredText: boolean
}

class SearchBooks extends React.Component<SearchBooksProps, SearchBooksState> {
    constructor(props: SearchBooksProps, context: SearchBooksState) {
        super(props, context);

        // Initialize the state.
        this.state = {
            bookRegistry: {
                Books: []
            },
            query: '',
            haveEnteredText:false
        };
    }

    componentWillUnmount() {
        this.props.onCloseSearch();
    }

    public static searchBooksPageURL: string = "/search";

    private get books(): Array<BookModel> {
        return this.state.bookRegistry.Books;
    }

    private get possibleShelves(): Array<string | undefined> {
        return BookFactory.getPossibleBookShelves(this.books);
    }

    private get onUpdateBookShelf(): (bookId: string, shelf: string) => void {
        return this.props.onUpdateBookShelf;
    }

    // Clears any query state.
    clearQuery() {
        this.updateQuery('');
    }

    updateQuery(query: string): void {
        if(this.state.query != query) {
            this.setState({
                query: query.trim()
            });
        }
    }

    updateEnteredTextSwitch() {
        this.setState({
            haveEnteredText: true
        })
    }

    updateBookRegistry(books: Array<BookModel>) {
        this.setState({
            bookRegistry: {
                Books: books
            }
        })
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={this.props.onCloseSearch}>Close</a>
                    <div className="search-books-input-wrapper">
                        {/*
                          NOTES: The search from BooksAPI is limited to a particular set of search terms.
                          You can find these search terms here:
                          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                          you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input type="text"
                               placeholder="Search by title or author"
                               onChange={(event) => {
                                   if (!this.state.haveEnteredText) {
                                       this.updateEnteredTextSwitch();
                                   }

                                   if(this.state.query != event.target.value) {
                                       this.searchBooks(event.target.value);
                                   }
                               }}/>
                    </div>
                </div>
                <div className="search-books-results">
                    {(this.books.length < 1) && (this.state.haveEnteredText) &&
                        "No books were found. Please try a different Search."
                    }
                    <div className="list-books-content">
                        <div>
                            <ol className="books-grid">
                                {
                                    this.books.map((bookModel: BookModel) => {
                                        return (
                                            <li>
                                                <Book bookModel={bookModel}
                                                      onUpdateBookShelf={this.onUpdateBookShelf}
                                                      possibleShelves={this.possibleShelves}
                                                />
                                            </li>
                                        );
                                    })
                                }
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private searchBooks(query: string): Promise<Array<BookModel>> {
        if (query != null && query != undefined && query != "") {
            let searchPromise = BooksAPI.search(query)
                .then((books: Array<BookModel>) => {
                    if (books && books.length > 0) {
                        let bookModels = books.map((book) => {
                            let bookModel = BookFactory.extractBookModel(book);
                            return bookModel;
                        });
                        return bookModels;
                    }
                    return null;
                })
                .then((books) => {
                    if(books) {
                        books = this.addShelvesToFoundBooks(books)
                    }
                    this.updateQuery(query);
                    this.updateBooks(books);
                });

            return searchPromise;
        }
        // return empty array into promise if query was empty or null.
        return Promise.resolve([]);
    }

    private updateBooks(books: Array<BookModel>): void {
        if (books != null && books != undefined) {
            this.updateBookRegistry(books);
        }
        else {
            this.updateBookRegistry([]);
        }
    }

    private addShelvesToFoundBooks(foundBooks: Array<BookModel>)
    : Array<BookModel>
      {
        if (foundBooks) {
            foundBooks.forEach((foundBook) =>  {
            let foundBooksWithShelfData =
                this.props.shelvedBooksRegistry.Books.find((shelvedBook) =>
                    (shelvedBook && shelvedBook != undefined)
                    && (shelvedBook.id === foundBook.id)
                    && (this.checkStringForNullOrEmpty(shelvedBook.shelf)));

                    if(foundBooksWithShelfData) {
                        foundBook.shelf = foundBooksWithShelfData.shelf;
                    }
                    else {
                        foundBook.shelf = "None";
                    }

            });
        }
        return foundBooks;
      }

    private checkStringForNullOrEmpty(stringAtHand: string | undefined): boolean {
        return (stringAtHand != undefined && stringAtHand != null && stringAtHand != "")
    }


}

export default SearchBooks;
