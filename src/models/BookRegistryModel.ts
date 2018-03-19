import BookModel  from 'models/BookModel'
import BookShelfModel  from 'models/'

class BookRegistryModel {
    BookToBookShelfMap: Map<BookModel, BookShelfModel>
}

export default BookRegistryModel;