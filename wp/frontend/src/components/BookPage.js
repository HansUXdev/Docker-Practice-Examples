import React, { Component,Fragment } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
export class BookPage extends Component {
  state = {
    book: {},
    isLoaded: false
  }

  componentDidMount(){
    axios.get(`/wp-json/wp/v2/books/${this.props.match.params.id}`)
    .then(res => {
      console.log("BookPage",res);
      this.setState({
        book: res.data,
        isLoaded: true
      })
    })
    .catch(err => console.log('error loading BookPage Data',err));
  }

  render() {
    
    const {book,isLoaded} = this.state;
    if (isLoaded) {
      return (
        <Fragment>
          <Link to='/'> Go Back </Link>
          <hr/>
          <h1>{book.title.rendered}</h1>
          <div dangerouslySetInnerHTML={{__html: book.content.rendered}}></div>
          <h4>Publisher: {book.acf.publisher}</h4>
        </Fragment>
      ) 
    }
    return <h3>Is Loading</h3>
  }
}

export default BookPage
