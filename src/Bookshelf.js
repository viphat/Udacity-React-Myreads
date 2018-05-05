import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {
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
        <h2 className="bookshelf-title">{ this.title }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.books.map((book) => (
                <Book key={book.id} book={ book }/>
              ))
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
