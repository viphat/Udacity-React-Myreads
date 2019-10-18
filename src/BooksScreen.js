import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import LoadingSpinner from './LoadingSpinner';
import { observer } from 'mobx-react';

class BooksScreen extends Component {
  componentDidMount() {
    this.props.store.getBooks();
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>Eddie Bookshelf</h1>
        </div>
        <div className="list-books-content">
          { this.props.store.loading === true ? <LoadingSpinner /> : (
            <div>
            <Bookshelf
              shelf='currentlyReading'
              books={ this.props.store.booksList.currentlyReadingBooks }
              store={ this.props.store }
            />
            <Bookshelf
              shelf='wantToRead'
              books={ this.props.store.booksList.wantToReadBooks }
              store={ this.props.store }
            />
            <Bookshelf
              shelf='read'
              books={ this.props.store.booksList.readBooks }
              store={ this.props.store }
            />
            </div>
          )}
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default observer(BooksScreen)
