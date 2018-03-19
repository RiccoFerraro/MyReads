import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EscapeRegex from 'escape-string-regexp';
import BookModel from "models/BookModel";

interface BookshelfProps extends React.HTMLProps<any> {
    shelvedBooks: Array<BookModel>;
    onUpdateBookShelf: (bookId: string, shelf: string) => void;
}

interface BookshelfState {
    query: string
}

class Bookshelf extends React.Component<BookshelfProps, BookshelfState>
{
    constructor(propTypes: BookshelfProps) {
        super(propTypes);
        this.propTypes = propTypes;
        // Initialize the state.
        this.state = {query : ''};
    }
    propTypes : BookshelfProps;

    updateQuery(query: string) : void {
        this.setState({
            query: query.trim()
        });
    }

    // Clears any query state.
    clearQuery() {
        this.updateQuery('');
    }

    render() : React.ReactElement<BookshelfProps> {
        let showingContacts = this.getMatchedContats(query, contacts);

        return (

        );
    }

    private getMatchedContats(query: string, contacts: Array<any>) : Array<any> {
        if (this.state.query) {
            const match = new RegExp(EscapeRegex(query), 'i');
            return contacts.filter((contact) =>
                match.test(contact.name));

        }
        else {
            return contacts;
        }
    }
}



export default Bookshelf;