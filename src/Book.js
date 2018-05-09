import React, { Component } from 'react'
import BookshelfChanger from './BookshelfChanger'
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
  }

  authorsName() {
    if (this.props.book.authors === undefined) {
      return '';
    }

    return this.props.book.authors.join(', ');
  }

  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + this.props.book.imageLinks.thumbnail + ' ")' }}></div>
            <div className="book-shelf-changer">
              <BookshelfChanger />
            </div>
          </div>
          <div className="book-title">{ this.props.book.title }</div>
          <div className="book-authors">{ this.authorsName() }</div>
        </div>
      </li>
    );
  }
}

export default Book;
