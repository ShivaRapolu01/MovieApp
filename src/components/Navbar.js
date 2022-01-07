import React, { Component } from 'react';
import { addMovieToList, handleMovieSearch } from '../actions';
// import { data } from '../data';
// import { StoreContext } from '..';
// import {connect} from '../index';
import {connect} from 'react-redux';

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchText:'',
        };
    }

   handleAddToMovies=(movie)=>{
       this.props.dispatch(addMovieToList(movie));
       this.setState({
           showSearchResults:false
       });
   }
    handleSearch=()=>{
        const {searchText}=this.state;
        this.props.dispatch(handleMovieSearch(searchText));
    };
    handleChange=(e)=>{
        this.setState({
             searchText:e.target.value
        });
          
    };
    render(){
            const {result:movie,showSearchResults}=this.props.search;// while destructing if we want to give another name for a key in props we use ':' => result:movie. We can use movie instead of result in our code scope 
         return (
     <div className="nav">
         <div className="search-container">
             <input onChange={this.handleChange}/>
             <button id="search-btn" onClick={this.handleSearch}>Search</button>
             {showSearchResults &&
            ( <div className="search-results">
                 <div className="search-result">
                       <img src={movie.Poster} alt="search-pic"/>
                       <div className="movie-info">
                           <span>{movie.Title}</span>
                           <button onClick={() => this.handleAddToMovies(movie)}>
                    Add to Movies
                  </button>

                       </div>
                 </div>
             </div>
             )
             
             }
         </div>
     </div>
  );
}
}

/*
class NavbarWrapper extends React.Component {
  render() {
    return (
      <StoreContext.Consumer>
        {(store) => (
          <Navbar dispatch={store.dispatch} search={this.props.search} />
        )}
      </StoreContext.Consumer>
    );
  }
}
export default NavbarWrapper; 
*/

/*
function  mapStateToProps(state){
  return{
    search:state.search
  }
}

instead of writing this we can directly destructure search from state
*/
function  mapStateToProps({search}){
  return{
   search:search
  };
}
const ConnectedNavbarComponent=connect(mapStateToProps)(Navbar);
export default ConnectedNavbarComponent; 
