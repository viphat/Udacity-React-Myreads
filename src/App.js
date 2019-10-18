import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
// import SearchBooks from './SearchBooks'
import BooksScreen from './BooksScreen';
import BookStore from './BookStore';

const bookStore = new BookStore();

class BooksApp extends React.Component {
  state = { }

  render() {
    return (
      <div className="app">
        {/*
        <Route path='/search' render={() => (
          <SearchBooks />
        )} />*/}
        <Route exact path='/' render={() => (
          <BooksScreen store={bookStore} />
        )} />
      </div>
    )
  }
}

export default BooksApp
