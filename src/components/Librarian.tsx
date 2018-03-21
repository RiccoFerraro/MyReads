import React, { Component } from 'react';
import TitleUtility from "utility/TitleUtility"

interface ILibrarianProps extends React.HTMLProps<ILibrarianProps> {
    currentBookShelf: string | undefined;
    possibleShelves: Array<string | undefined>;
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

    private get PossibleShelves() : Array<string | undefined> {
        return this.props.possibleShelves;
    }

    render() : React.ReactElement<ILibrarianProps> {
        return (
            <div className="book-shelf-changer">
                <select value={this.CurrentShelf}
                        onChange={(event) => {
                            this.props.onUpdateBookShelf(event.target.value);
                        }
                }>
                    <option value="" disabled>Move to...</option>
                    {this.PossibleShelves.map((shelf) => {
                        return (
                            <option key={shelf} value={shelf}>
                                {TitleUtility.makePascalOrCamelCaseToTitle(shelf)}
                            </option>
                            );
                    })}
                    <option value="">None</option>
                </select>
            </div>
        );
    }
}


export default Librarian;