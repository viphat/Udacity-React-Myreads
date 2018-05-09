import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types';

class Bookshelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired
  }

  componentDidMount() {
    switch (this.props.shelf) {
      case 'currentlyReading':
        this.title = 'Currently Reading';
        break;
      case 'wantToRead':
        this.title = 'Want To Read';
        break;
      default:
        this.title = 'Read';
    };
  }

  render() {
    return (
      <div className="bookshelf">
        { this.props.shelf !== 'none' && (
          <h2 className="bookshelf-title">{ this.title }</h2>
        ) }
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.books.map((book) => (
                <Book key={ book.id } book={ book }/>
              ))
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
