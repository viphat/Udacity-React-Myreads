import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import {DebounceInput} from 'react-debounce-input'
import Book from './Book'
import _ from 'lodash'
import LoadingSpinner from './LoadingSpinner'

class SearchBooks extends Component {
  state = {
    query: '',
    books: [],
    loading: false
  }

  updateQuery = (query) => {
    query = query.trim();

    if (query === '') {
      this.setState(() => ({
        query: '',
        books: [],
        loading: false
      }));
      return;
    }

    this.setState(() => ({
      query: query,
      books: [],
      loading: true
    }));

    BooksAPI.search(query).then((res) => {
      if (res === undefined || res === null || (res && res.error)) {
        this.setState(() => ({
          books: [],
          loading: false
        }));
        return;
      }

      BooksAPI.getAll().then((myBooks) => {
        this.setState(() => ({
          books: res.map((book) => {
            let b = _.find(myBooks, (b) => { return b.id === book.id });
            return b === undefined ? book : b;
          }),
          loading: false
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
    const { query, books, loading } = this.state;
    const resultIsEmpty = loading === false && query.length > 0 && books.length === 0;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput type="text"
              minLength={2}
              debounceTimeout={500}
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          { loading === true && (
            <LoadingSpinner />
          )}

          {  resultIsEmpty ? (
            <div className='full-width align-center'>
              We didn't find any books that meets your search term.
            </div>
          ) : (
            <ol className="books-grid">
              {
                books.map((book) => (
                  <Book
                    key={ book.id }
                    book={ book }
                    onUpdate={this.onUpdate}
                  />
                ))
              }
            </ol>
          ) }
        </div>
      </div>
    )
  }
}

export default SearchBooks
