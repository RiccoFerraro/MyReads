import React, { Component } from 'react';
import BookModel from "models/BookModel";
import Librarian from "Librarian";

interface IBookProps extends React.HTMLProps<IBookProps> {
    bookModel: BookModel
    possibleShelves: Array<string | undefined>;
    onUpdateBookShelf: (bookId: string, shelf: string) => void;
}

class Book extends React.Component<IBookProps>
{
    propTypes : IBookProps;

    constructor(propTypes: IBookProps) {
        super(propTypes);
        this.propTypes = propTypes;
    }
    private get bookModel() : BookModel {
        return this.props.bookModel;
    }

    private get possibleShelves() : Array<string | undefined> {
        return this.props.possibleShelves;
    }

    private get onUpdateBookShelf() : (bookId: string, shelf: string) => void {
        return this.props.onUpdateBookShelf;
    }

    private get smallThumbnailUrl() : string {
        let result: string = '';
        if (this.bookModel.imageLinks) {
            result = this.bookModel.imageLinks.smallThumbnail;
        }
        return result;
    }

    render() : React.ReactElement<IBookProps> {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.smallThumbnailUrl}")`}}>
                        <Librarian  currentBookShelf={this.bookModel.shelf}
                                    onUpdateBookShelf={(shelf: string) => { this.onUpdateBookShelf(this.bookModel.id, shelf) }}
                                    possibleShelves = {this.possibleShelves} />
                    </div>
                </div>
                <div className="book-title">{this.bookModel.title}
                </div>
                <div className="book-authors">
                    {this.bookModel && this.bookModel.authors &&
                        this.bookModel.authors
                            .map((author) => (
                                <span>
                                    {author}
                                </span>))
                            .join("<br/>")
                    }
                </div>
            </div>
        );
    }
}


export default Book;