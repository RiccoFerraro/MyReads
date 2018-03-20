import "src/App.css";
import * as React from "react";
import BookRegistryModel from "models/BookRegistryModel";
import Book from "components/Book"
import * as BooksAPI from "utility/BooksAPI"

import BookRepository, {default as BookFactory} from "utility/BookFactory"
import BookModel from "models/BookModel";

interface SearchBooksProps extends React.HTMLProps<SearchBooksProps> {
    onUpdateBookShelf:  (bookId: string, shelf: string) => void;
}

interface SearchBooksState {
    bookRegistry: BookRegistryModel;
    query: string;
}

class SearchBooks extends React.Component<SearchBooksProps, SearchBooksState> {
    constructor(props: SearchBooksProps, context: SearchBooksState) {
        super(props, context);

        // Initialize the state.
        this.state = {
            bookRegistry: {
                Books: []
            },
            query: ''
        };
    }


    public static searchBooksPageURL: string = "/search";

    private get books(): Array<BookModel> {
        return this.state.bookRegistry.Books;
    }

    private get possibleShelves(): Array<string | undefined> {
        return BookFactory.getPossibleBookShelves(this.books);
    }

    private get onUpdateBookShelf() : (bookId: string, shelf: string) => void {
        return this.props.onUpdateBookShelf;
    }

    // Clears any query state.
    clearQuery() {
        this.updateQuery('');
    }

    updateQuery(query: string) : void {
        this.setState({
            query: query.trim()
        });
    }

    updateBookRegistry(books: Array<BookModel>) {
        this.setState({
            bookRegistry: {
                Books: books
            }
        })
    }

    // The BooksAPI has a search function which we can depend on! Use that instead of this mess!
    // private get matchedAuthors(authors: Array<string>, regexMatch : RegExp): boolean {
    //     let matches = authors.map((author) => regexMatch.test(author));
    //
    //     return matches
    //        .filter((match) => match)
    //        .length > 0;
    // }
    //
    // private getMatchedBooks(query: string, books: Array<BookModel>) : Array<BookModel> {
    //     if (this.state.query) {
    //
    //
    //         const match = new RegExp(EscapeRegex(query), 'i');
    //         return books.filter((book: BookModel) => {
    //                 if(book != undefined || book != null && (match.test(book.title) || this.matchedAuthors(book.authors, match))) {
    //                     return true;
    //                 }
    //                 return false;
    //         }
    //
    //            ));
    //
    //     }
    //     else {
    //         return books;
    //     }
    // }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={this.props.onClose}>Close</a>
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
                                   this.searchBooks(event.target.value);
                               }}/>
                    </div>
                </div>
                <div className="search-books-results">
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
                            };
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
            .then((books) => {
                let bookModels = books.map((book) => {
                    let bookModel = BookFactory.extractBookModel(book);
                    return bookModel;
                });
                this.updateQuery(query);
                this.updateBookRegistry(bookModels);

                return bookModels;
            });

            return searchPromise;
        }
        // return empty array into promise if query was empty or null.
        return Promise.resolve([]);
    }


}

export default SearchBooks;