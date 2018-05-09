import React, { Component } from 'react'
import PropTypes from 'prop-types';

class BookshelfChanger extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
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

  render() {
    return (
      <select value={this.props.book.shelf}>
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
