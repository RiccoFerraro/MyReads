import React, {Component} from 'react';
import BookModel from "models/BookModel";
import Book from "components/Book"
import TitleUtility from "utility/TitleUtility";

interface BookshelfProps extends React.HTMLProps<BookshelfProps> {
    title: string;
    shelvedBooks: Array<BookModel>;
    possibleShelves: Array<string | undefined>; // I DO NOT LIKE plubming this through here so that the librarian can use it. This violates SRP, It also violates LSP in some regards. So I hear, Redux solves this problem. That's for lesson 2 though.
    onUpdateBookShelf: (bookId: string, shelf: string) => void;

}

class Bookshelf extends React.Component<BookshelfProps, any> {
    propTypes: BookshelfProps;

    constructor(propTypes: BookshelfProps) {
        super(propTypes);
        this.propTypes = propTypes;
    }

    private get shelvedBooks(): Array<BookModel> {
        return this.props.shelvedBooks;
    }

    private get possibleShelves(): Array<string | undefined> {
        return this.props.possibleShelves;
    }

    private get formattedShelfName(): string | undefined {
        let camelCaseTitle = this.props.title;
        return TitleUtility.makePascalOrCamelCaseToTitle(camelCaseTitle);

    }

    private get onUpdateBookShelf(): (bookId: string, shelf: string) => void {
        return this.props.onUpdateBookShelf;
    }

    render(): React.ReactElement<BookshelfProps> {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.formattedShelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.shelvedBooks.map((shelvedBook) => {
                            return (
                                <li>
                                    <Book
                                        key={shelvedBook.id}
                                        bookModel={shelvedBook}
                                        onUpdateBookShelf={this.onUpdateBookShelf}
                                        possibleShelves={this.possibleShelves}
                                    />
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        );
    }

}


export default Bookshelf;