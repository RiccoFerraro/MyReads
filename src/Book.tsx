import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EscapeRegex from 'escape-string-regexp';
import BookModel from "models/BookModel";

interface BookProps extends React.HTMLProps<any> {
    bookModel: BookModel;
    onUpdateBookShelf: (bookId: string, shelf: string) => void;
}

class Book extends React.Component<BookProps>
{
    propTypes : BookProps;

    constructor(propTypes: BookProps) {
        super(propTypes);
        this.propTypes = propTypes;
    }
    private get BookModel() : BookModel {
        return this.props.bookModel;
    }

    private get smallThumbnailUrl() {
        let result: string = '';
        if (this.BookModel.imageLinks) {
            result = book.imageLinks.smallThumbnail;
        }
        return result;
    }

    render() : React.ReactElement<BookProps> {


        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.smallThumbnailUrl}")`}}></div>
                </div>
            </div>
        );
    }
}


export default Book;