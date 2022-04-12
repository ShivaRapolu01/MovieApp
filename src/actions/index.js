//actions are basically objects in JS having a type property,along with other properties like array, objects in them
// {
//     type:'INCREASE_COUNT'
// } 
// {
//     type:'DECREASE_COUNT'
// } 

//action types
//these variables are called action types .We use action types for returning variables when we see app.js when we dispatching our action ,action is of type 'ADD_MOVIES'  
export const  ADD_MOVIES='ADD_MOVIES';
export const  ADD_TO_FAVOURITES='ADD_TO_FAVOURITES';
export const  REMOVE_FROM_FAVOURITES='REMOVE_FROM_FAVOURITES';
export const  SET_SHOW_FAVOURITES='SET_SHOW_FAVOURITES';
export const ADD_MOVIE_TO_LIST='ADD_MOVIE_TO_LIST';
export const ADD_SEARCH_RESULT='ADD_SEARCH_RESULT';

console.log("inside action index.js");

//action creators

//action creater for returning actions 
export  function addMovies(movies){
    return {
        type:ADD_MOVIES,
        movies:movies
    }
} 

export   function addFavourite(movie){
     return {
         type:ADD_TO_FAVOURITES,
         movie:movie
     }
}
export function removeFromFavourites(movie){
    return{
        type:REMOVE_FROM_FAVOURITES,
        movie:movie
    }
}

export function setShowFavourites(val){
    return{
        type:SET_SHOW_FAVOURITES,
        val:val
    }
}


export function addMovieToList(movie) {
    return {
      type: ADD_MOVIE_TO_LIST,
      movie:movie
    };
  }

  export function handleMovieSearch(movie){
      return function (dispatch){
          const url=`http://www.omdbapi.com/?apikey=3ac0947a&t=${movie}`;
          fetch(url)
    //   .then(response=>console.log(response));
    .catch((e)=>console.log(e))
    .then(response=>response.json())
    .then(movie=>{
        console.log('movie',movie);
        //dispatch an action to add this new movie to the store 
      dispatch(addMovieSearchResult(movie));
    })
     
      }
      
  }
  //know about redux-thunk https://daveceddia.com/what-is-a-thunk/

  export function  addMovieSearchResult(movie){
      return{
          type:ADD_SEARCH_RESULT,
          movie
      }
  }
