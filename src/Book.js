import React, { Component } from 'react'
import BookshelfChanger from './BookshelfChanger'
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  }

  authorsName() {
    if (this.props.book.authors === undefined) {
      return '';
    }

    return this.props.book.authors.join(', ');
  }

  render() {
    let thumbnail =
      this.props.book.imageLinks ?
        this.props.book.imageLinks.thumbnail :
        'http://place-hold.it/128x193';

    let bookCoverStyle = {
      width: 128,
      height: 193,
      backgroundImage: `url("${thumbnail}")`
    }

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={ bookCoverStyle }></div>
            <div className="book-shelf-changer">
              <BookshelfChanger
                book={this.props.book}
                store={this.props.store}
              />
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
