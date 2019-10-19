import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import Book from './Book';
import LoadingSpinner from './LoadingSpinner';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

class SearchBooks extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }

  state = {
    query: '',
  }

  componentDidMount() {
    this.props.store.loading = false;
  }

  onUpdateQuery(query) {
    this.setState(() =>({
      query: query,
    }));
    this.props.store.searchBooksByQuery(query);
  }

  render() {
    const { books, loading } = this.props.store;
    const { query } = this.state;
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
              value={ query }
              onChange={(event) => this.onUpdateQuery(event.target.value)}
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
                    store={ this.props.store }
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

export default observer(SearchBooks);
