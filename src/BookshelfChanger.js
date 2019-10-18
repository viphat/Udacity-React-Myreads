import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookshelfChanger extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.readingStatuses = {
      currentlyReading: 'Currently Reading',
      wantToRead: 'Want to Read',
      read: 'Read',
      none: 'None'
    };
  }

  currentShelf() {
    return this.props.book.shelf ? this.props.book.shelf : 'none';
  }

  updateBookShelf(book, shelf) {
    this.props.store.updateBook(book, shelf)
  }

  render() {
    return (
      <select
        value={this.currentShelf()}
        onChange={(event) => this.updateBookShelf(this.props.book, event.target.value)}
      >
        <option value='' disabled>
          Move to...
        </option>
        {
          Object.keys(this.readingStatuses).map((statusKey) => (
            <option
              key={statusKey}
              value={statusKey}
            >
              { this.readingStatuses[statusKey] }
            </option>
          ))
        }
      </select>
    );
  }
}

export default BookshelfChanger
