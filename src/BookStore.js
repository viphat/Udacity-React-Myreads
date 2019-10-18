import { decorate, observable, action } from 'mobx';
import * as BooksAPI from './BooksAPI';

export default class BookStore {
  booksList = {
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: [],
  };
  loading = true;

  getBooks() {
    BooksAPI.getAll().then((books) => {
      this.loading = false;
      this.booksList = {
        currentlyReadingBooks: this.filterBooks(books, 'currentlyReading'),
        wantToReadBooks: this.filterBooks(books, 'wantToRead'),
        readBooks: this.filterBooks(books, 'read'),
      };
    })
  }

  filterBooks(books, shelf) {
    let filteredBooks =
      books.filter((b) => {
        return b.shelf === shelf;
      });
    return filteredBooks;
  }

  updateBook(book, shelf) {
    BooksAPI.update(book, shelf).then((res) => {
      this.getBooks();
    });
  }
}

decorate(BookStore, {
  booksList: observable,
  loading: observable,
  getBooks: action,
  updateBook: action,
});
