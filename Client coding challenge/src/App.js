import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      apiurl :"https://www.googleapis.com/books/v1/volumes",
      author :"",
      thumbnail:"",
      textSnippet:"",
      title:""
    }
  }

  searchfunc = (event) =>{
    event.preventReload()
    const name = event.currentTarget.search.value
    const settings = {
      method: 'GET'
    }
    fetch(`${this.state.apiurl}q=${name}`,settings)
    .then(response=>{
      if (response.ok) {
        return response.json()
      }else{
        throw new Error("Fetch Fail")
      }    
    })
    .then(responseJson=>{
        this.setState({
          author: responseJson.items[0].volumeInfo.authors[0],
          thumbnail: responseJson.items[0].imageLinks.thumbnail,
          textSnippet: responseJson.items[0].searchInfo.textSnippet,
          title : responseJson.items[0].volumeInfo.title
        })
    })
    .catch(err=>{
      console.log(err);
    })
  }

  render(){
    return(
      <div>

        <BookForm />
        <Book author={this.state.author}
              title={this.state.title}
              textSnippet={this.state.textSnippet}
              thumbnail={this.state.thumbnail} />
      </div>
    )
  }

}

export default App;
