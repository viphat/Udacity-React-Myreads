import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

class Bookshelf extends Component {
  static propTypes = {
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    store: PropTypes.object.isRequired,
  }

  getTitle() {
    switch (this.props.shelf) {
      case 'currentlyReading':
        return 'Currently Reading';
      case 'wantToRead':
        return 'Want To Read';
      default:
        return 'Read';
    }
  }

  render() {
    return (
      <div className="bookshelf">
        { this.props.shelf !== 'none' && (
          <h2 className="bookshelf-title">{ this.getTitle() }</h2>
        ) }
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.books.map((book) => (
                <Book
                  key={ book.id }
                  book={ book }
                  store={ this.props.store }
                />
              ))
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default observer(Bookshelf);
