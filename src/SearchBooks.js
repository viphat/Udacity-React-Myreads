import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import {DebounceInput} from 'react-debounce-input'
import Book from './Book'
import _ from 'lodash'

class SearchBooks extends Component {
  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }));

    BooksAPI.search(query).then((res) => {
      if (res === undefined || res === null || (res && res.error)) {
        return;
      }

      BooksAPI.getAll().then((myBooks) => {
        this.setState(() => ({
          books: res.map((book) => {
            let b = _.find(myBooks, (b) => { return b.id === book.id });
            return b === undefined ? book : b;
          })
        }));
      })
    });
  }

  onUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      if (res === undefined || res === null) {
        return;
      }

      this.setState((prevState) => ({
        books: prevState.books.map((b) => {
          if (b.id === book.id) {
            b.shelf = shelf;
          }
          return b;
        })
      }));
    });
  }

  render() {
    const { query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput type="text"
              minLength={2}
              debounceTimeout={100}
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.books.map((book) => (
                <Book
                  key={ book.id }
                  book={ book }
                  onUpdate={this.onUpdate}
                />
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
