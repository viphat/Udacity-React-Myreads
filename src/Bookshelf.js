import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types';

class Bookshelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired
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
                  onUpdate={this.props.onUpdate}
                />
              ))
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
