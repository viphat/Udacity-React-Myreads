import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
  state = {
    books: [],
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: []
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
    })
  }

  filterBooks(shelf) {
    let filteredBooks =
      this.state.books.filter((b) => {
        return b.shelf === shelf;
      });
    console.log(filteredBooks);
    return filteredBooks;
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>Eddie Bookshelf</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              shelf='currentlyReading'
              books={ this.state.currentlyReadingBooks }
            />
            <Bookshelf
              shelf='wantToRead'
              books={ this.state.wantToReadBooks }
            />
            <Bookshelf
              shelf='read'
              books={ this.state.readBooks }
            />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
