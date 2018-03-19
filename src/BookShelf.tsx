import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EscapeRegex from 'escape-string-regexp';

interface BookshelfProps extends React.HTMLProps<any> {
    contacts : Array<any>,
    onDeleteContact: (contact: object) => void
    onNavigate: () => void
}

interface BookshelfState {
    query: string
}

class ListContacts extends React.Component<BookshelfProps, BookshelfState>
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
        const { contacts, onDeleteContact }: BookshelfProps = this.props;
        const { query }: BookshelfState = this.state;

        let showingContacts = this.getMatchedContats(query, contacts);

        return (
            {/*<div className='list-contacts'>*/}
                {/*<div className='list-contacts-top'>*/}
                    {/*<input*/}
                        {/*className='search-contacts'*/}
                        {/*type='text'*/}
                        {/*placeholder="Search contacts"*/}
                        {/*value={query}*/}
                        {/*onChange={(event) => this.updateQuery(event.target.value)}*/}
                    {/*/>*/}
                    {/*<Link*/}
                        {/*to ="/create"*/}
                        {/*className='add-contact'*/}
                    {/*> Add Contact*/}
                    {/*</Link>*/}
                {/*</div>*/}

                {/*{showingContacts.length !== contacts.length && (*/}
                    {/*<div className='showing-contacts'>*/}
                        {/*<span>Now showing {showingContacts.length} of {contacts.length} total</span>*/}
                        {/*<button onClick={() => this.clearQuery()}>Show all</button>*/}
                    {/*</div>*/}
                {/*)}*/}
                {/*<ol className='contact-list'>*/}
                    {/*{showingContacts.map((contact) =>*/}
                        {/*<li key={contact.id}>*/}
                            {/*<div className='contact-avatar' style ={{*/}
                                {/*backgroundImage: `url(${contact.avatarURL})`*/}
                            {/*}} />*/}
                            {/*<div className ='contact-details'>*/}
                                {/*<p>{contact.name}</p>*/}
                                {/*<p>{contact.email}</p>*/}
                            {/*</div>*/}
                            {/*<button onClick={() => onDeleteContact(contact)} className='contact-remove'>*/}
                                {/*Remove*/}
                            {/*</button>*/}
                        {/*</li>*/}
                    {/*)}*/}
                {/*</ol>*/}
            {/*</div>*/}
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



export default ListContacts;