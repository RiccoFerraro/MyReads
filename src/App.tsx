import React from 'react'
import 'App.css'
import MyReadsApplication from "components/MyReadsApp";
import {Router} from "react-router"
import {BrowserRouter} from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
            <MyReadsApplication/>
        )
    }
}

export default App
