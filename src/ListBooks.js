import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import LoadingSpinner from './LoadingSpinner'

class ListBooks extends Component {
  state = {
    books: [],
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: [],
    loading: true
  }

  getBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }));

      this.setState(() => ({
        currentlyReadingBooks:
          this.filterBooks('currentlyReading')
      }));

      this.setState(() => ({
        wantToReadBooks:
          this.filterBooks('wantToRead')
      }));

      this.setState(() => ({
        readBooks:
          this.filterBooks('read')
      }));

      this.setState(() => ({ loading: false }));
    })
  }

  filterBooks(shelf) {
    let filteredBooks =
      this.state.books.filter((b) => {
        return b.shelf === shelf;
      });
    return filteredBooks;
  }

  updateBook(book, shelf) {
    BooksAPI.update(book, shelf).then((res) => {
      this.getBooks();
    });
  }

  constructor() {
    super();
    this.updateBook = this.updateBook.bind(this);
  }

  componentDidMount() {
    this.setState(() => ({ loading: true }));
    this.getBooks();
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>Eddie Bookshelf</h1>
        </div>
        <div className="list-books-content">
          { this.state.loading === true ? <LoadingSpinner /> : (
            <div>
              <Bookshelf
                shelf='currentlyReading'
                books={ this.state.currentlyReadingBooks }
                onUpdate={ this.updateBook }
              />
              <Bookshelf
                shelf='wantToRead'
                books={ this.state.wantToReadBooks }
                onUpdate={ this.updateBook }
              />
              <Bookshelf
                shelf='read'
                books={ this.state.readBooks }
                onUpdate={ this.updateBook }
              />
            </div>
          )}
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
