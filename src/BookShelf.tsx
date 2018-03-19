import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EscapeRegex from 'escape-string-regexp';
import BookModel from "models/BookModel";

interface BookshelfProps extends React.HTMLProps<any> {
    shelvedBooks: Array<BookModel>;
    onUpdateBookShelf: (bookId: string, shelf: string) => void;
}

class Bookshelf extends React.Component<BookshelfProps, any>
{
    propTypes : BookshelfProps;

    constructor(propTypes: BookshelfProps) {
        super(propTypes);
        this.propTypes = propTypes;
    }

    render() : React.ReactElement<BookshelfProps> {
        let shelvedBooks = this.props.shelvedBooks;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        { shelvedBooks.map((shelvedBook) => {
                            return (
                                <li>
                                    <Book bookModel={shelvedBook}>

                                    </Book>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        );
    }

    // // Clears any query state.
    // clearQuery() {
    //     this.updateQuery('');
    // }

    // updateQuery(query: string) : void {
    //     this.setState({
    //         query: query.trim()
    //     });
    // }
    // private getMatchedContats(query: string, contacts: Array<any>) : Array<any> {
    //     if (this.state.query) {
    //         const match = new RegExp(EscapeRegex(query), 'i');
    //         return contacts.filter((contact) =>
    //             match.test(contact.name));
    //
    //     }
    //     else {
    //         return contacts;
    //     }
    // }
}


export default Bookshelf;