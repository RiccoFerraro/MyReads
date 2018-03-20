import React, { Component } from 'react';
import IBookShelfUpdaterProps from "models/IBookShelfUpdaterProps"
import BookModel from "models/BookModel";

interface ILibrarianProps extends React.HTMLProps<ILibrarianProps> {
    currentBookShelf: string | undefined;
    possibleShelves: Array<string>;
    onUpdateBookShelf: (shelf: string) => void;
}

class Librarian extends React.Component<ILibrarianProps, any>
{
    propTypes : ILibrarianProps;

    constructor(propTypes: ILibrarianProps) {
        super(propTypes);
        this.propTypes = propTypes;
    }

    // this.Props Getters.
    private get CurrentShelf() : string | undefined{
        return this.props.currentBookShelf;
    }

    private get PossibleShelves() : Array<string> {
        return this.props.possibleShelves;
    }

    private formatShelf(shelf: string){
        let upperCaseWithAddedSpaceResult = shelf.replace(/([A-Z])/g, " $1");

        let result = `${upperCaseWithAddedSpaceResult.charAt(0)
            .toUpperCase()}${upperCaseWithAddedSpaceResult.slice(1)}`;

        return result;
    }

    render() : React.ReactElement<ILibrarianProps> {
        return (
            <div className="book-shelf-changer">
                <select>
                    <option value="none" disabled>Move to...</option>
                    {this.PossibleShelves.map((shelf) => {
                        return (
                            <option key={shelf} value={shelf}>
                                {this.formatShelf(shelf)}
                            </option>
                            );
                    })}
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}


export default Librarian;