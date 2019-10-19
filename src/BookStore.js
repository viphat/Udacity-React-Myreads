import { decorate, observable, action } from 'mobx';
import * as BooksAPI from './BooksAPI';
import _ from 'lodash';

export default class BookStore {
  books = [];
  booksList = {
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: [],
  };
  loading = true;

  getBooks() {
    BooksAPI.getAll().then((books) => {
      this.loading = false;
      this.books = [];
      this.booksList = {
        currentlyReadingBooks: this.filterBooks(books, 'currentlyReading'),
        wantToReadBooks: this.filterBooks(books, 'wantToRead'),
        readBooks: this.filterBooks(books, 'read'),
      };
    })
  }

  searchBooksByQuery(query) {
    query = query.trim();

    if (query === '') {
      this.books = [];
      this.loading = false;
      return;
    }

    this.books = [];
    this.loading = true;

    BooksAPI.search(query).then((res) => {
      if (res === undefined || res === null || (res && res.error)) {
        this.books = [];
        this.loading = false;
        return;
      }

      BooksAPI.getAll().then((myBooks) => {
        this.books = res.map((book) => {
          let b = _.find(myBooks, (b) => { return b.id === book.id });
          return b === undefined ? book : b;
        });

        this.loading = false;
      })
    });
  }

  filterBooks(books, shelf) {
    let filteredBooks =
      books.filter((b) => {
        return b.shelf === shelf;
      });
    return filteredBooks;
  }

  updateBookShelf(book, shelf) {
    BooksAPI.update(book, shelf).then((res) => {
      this.getBooks();
    });
  }
}

decorate(BookStore, {
  books: observable,
  booksList: observable,
  loading: observable,
  getBooks: action,
  updateBookShelf: action,
  searchBooksByQuery: action,
});
