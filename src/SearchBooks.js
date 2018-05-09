import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import {DebounceInput} from 'react-debounce-input'
import Book from './Book'

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
      this.setState(() => ({
        books: res
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
                <Book key={ book.id } book={ book }/>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
