import React, { Component } from 'react';
import axios from 'axios';
import BookItem from './BookItem'

export class Books extends Component {
  state = {
    books: [],
    isLoaded: false
  }
  componentDidMount(){
    axios.get('/wp-json/wp/v2/books')
    .then(res => this.setState({
      books: res.data,
      isLoaded: true
    }))

    .catch(err => console.log('err on Books',err));
  }


  render() {
    // console.log(this.state);
    const {books, isLoaded} = this.state;
    if(isLoaded){
      return (
        <div>
          {books.map(book => ( 
              <BookItem key={books.id} book={book} /> 
            )
          )}
        </div>
      )
    }
    return <div></div>

  }
}

export default Books
