import * as BooksAPI from "utility/BooksAPI";
import BookModel from "models/BookModel";

class BookFactory {
    private static shelvesThatShouldAlwaysExist: Array<string> = ["currentlyReading", "read", "wantToRead"];
    public static getAllBooks(): Promise<Array<BookModel>> {
        return BooksAPI.getAll()
            .then((books) => {
                let bookModels: Array<BookModel> = books.map(
                    (book)=> {
                        return BookFactory.extractBookModel(book);
                    });

                return bookModels;
            });
    }

    public static getUniqueBookShelfNames(books: Array<BookModel>): Array<string | undefined> {
        let allFoundBookShelfNames: Array<string | undefined> = books.map(
            (book) => book.shelf
        );

        return Array.from(new Set(allFoundBookShelfNames));
    }

    public static getPossibleBookShelves(books: Array<BookModel>)
        : Array<string | undefined> {
        let foundShelves = BookFactory.getUniqueBookShelfNames(books);
        let allShelvesWithRepeats = foundShelves.concat(BookFactory.shelvesThatShouldAlwaysExist);
        let uniqueShelves = new Set(allShelvesWithRepeats);
        return Array.from(uniqueShelves);
    }

    public static extractBookModel(book): BookModel {
        let bookModel: BookModel = new BookModel();

        if (book.id) {
            bookModel.id = book.id
        }
        if (book.title) {
            bookModel.title = book.title
        }
        if (book.authors) {
            bookModel.authors = book.authors
        }
        if (book.imageLinks) {
            bookModel.imageLinks = {
                smallThumbnail: book.imageLinks.smallThumbnail,
                thumbnail: book.imageLinks.thumbnail
            }
        }
        return bookModel;
    }

    public static searchBook(books: Array<BookModel>) {

    }
}

export default BookFactory;