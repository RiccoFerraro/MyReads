import React, { Component } from 'react';
import { Route } from 'react-router-dom';


interface AppState  {
    contacts: any,
    screen : string // either 'list' or 'create'. enum is probably better.
}
class App extends Component<any, AppState> {
    constructor(props: any, state: AppState) {
        super(props, state);
        this.state = {
            contacts: [],
            screen: 'list'
        };
    }

    render() {
        return <div className ='app'>
        </div>
    }
}

export default App;