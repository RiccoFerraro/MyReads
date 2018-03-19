import "src/App.css";
import * as React from "react";
import {History} from "history";
import {Route} from "react-router";
import BookRegistryModel from "models/BookRegistryModel";
import BookModel from "models/BookModel";
import BookShelfModel from "models/BookShelfModel";
import SearchPage from "src/components/myReads/SearchPage";
import BookshelfPage from "src/components/myReads/BookshelfPage"
import BookConnector from "src/data/connectors/BookConnector";


interface MyReadsAppState {
    BookToBookShelfMap: BookRegistryModel
}

class MyReadsApplication extends React.Component<any, MyReadsAppState> {

    BuildBookShelf() : void {

    }

}

export default MyReadsApplication;