import { combineReducers } from "redux";//this is inbuilt feature to combine reduces 
import { ADD_MOVIES , ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES,SET_SHOW_FAVOURITES,ADD_MOVIE_TO_LIST, ADD_SEARCH_RESULT } from "../actions";


 const initialMoviesState={
    list:[],
    favourites:[],
    showFavourites:false
}
export  function movies(state=initialMoviesState,action){

  console.log("MOVIES REDUCER");
    //state can be array, object,string or number
    //state=[] signifies that if state is undefined ,state is set to [] 
    /*
    console.log('action',action);
       if(action.type===ADD_MOVIES){// use variables instead of strings for comparision not action.type==='ADD_MOVIES' Because in future if we want to change the string we have change it in multiple places 
           console.log('action movies', action.movies);
           return {
               //https://www.notion.so/SPREAD-FUNCTION-22a2544bffe04665b76cf39177b13ae9
               ...state,list:action.movies
           };
       }

       return state; 
       //reducers must return a new state it can't change the old state of the store it can only return the new state  
     */
     
       switch(action.type){
           case ADD_MOVIES:
               return {
                   ...state,
                   list:action.movies
               };

        case ADD_TO_FAVOURITES:{
            return {
                ...state,
                favourites:[action.movie,...state.favourites] //adds new movie at the first
            }
        };
        case REMOVE_FROM_FAVOURITES: 
           const filteredArray=state.favourites.filter(
               movie=>movie.Title!==action.movie.Title
           );
           return {
               ...state,
               favourites:filteredArray
           };
           case SET_SHOW_FAVOURITES:
               return {
                   ...state,
                   showFavourites:action.val
               };
            case ADD_MOVIE_TO_LIST:
                return {
                  ...state,
                  list: [action.movie, ...state.list],
                };

               default:
                   return state; 
       }

    }



    const initialSearchState={
        result:{},
        showSearchResults:false

      
      };
      export function search(state=initialSearchState,action){
        switch(action.type){
                case  ADD_SEARCH_RESULT:
                return{
                  ...state,
                  result:action.movie,
            showSearchResults:true,


                } 
                case ADD_MOVIE_TO_LIST:
                  return {
                    ...state,
                showSearchResults:false
                  };
              default:
                  return state; 
      }

   }

      
      
      const initialRootState={
        movies:initialMoviesState,
        search:initialSearchState
      }
    
      /*
      export  default function rootReducer(state=initialRootState,action){
        return {
          movies:movies(state.movies,action),//state.movies must be passed instead of state because 'state' has state of both movies and search  
          search:search(state.search,action)
          // we are combining both reducers because createStore function only takes one reducer as argument. so we will manage the state of multiple reducers through a parent reducer
          // because if in future we add another reducers it becomes easy adding it to 1 root reducer
        }
      }
      instaead of creating a rootReducer we have a inbuilt combineReducers function in redux package 
        */
      export default combineReducers({
        movies:movies,
        search:search
      })