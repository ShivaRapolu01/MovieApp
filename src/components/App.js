import React from 'react';
//we are going to use store to get the data 
import Navbar from './Navbar';
import MovieCard from './MovieCard';
// import { render } from '@testing-library/react';
import { addMovies,setShowFavourites} from '../actions';
// import { StoreContext } from '../index';
import {data as moviesList} from '../data'; 
// import { connect } from '../index';
import {connect} from 'react-redux';





class App extends React.Component{
  componentDidMount(){
    // const {store}=this.props;
    // console.log('store',store);
    // store.subscribe(()=>{ //subscribe function returns a function that unsubscribes the change listener.const unsubscribe=store.subscribe(listener) unsubscribe();
      // console.log('UPDATED');
      // console.log('state in subscribe',this.props.store.getState());
      // this.forceUpdate();//to forcefully update the app //not recomended method .This is rerender whole app
      //without this line --> this.forceUpdate(); we have to change the state through reducer in the store
    // });
    //make api call 
    //dispatch action 
    this.props.dispatch(

    //   {
    //   type:'ADD_MOVIES',
    //   movies:data
    // } 
    // writing above code in terms of a function so that it can be reusable 
    addMovies(moviesList)
    
    );
    // console.log("hello");
    //when dispatch function ends subscribe function gets called and control returns back after subscribe call ends hence in console hello is displayed after UPDATED and state in subscirbe.. 
    // console.log('STATE',this.props.store.getState());
  }
  isMovieFavourite=(movie)=>{
    const {movies}=this.props;
    const index=movies.favourites.indexOf(movie);
    //returns -1 if it is not present else returns index
    if(index!==-1){
      //found the movie
      return true; 
    }
    return false ;

  };
   onChangeTab=(val)=>{
    this.props.dispatch(setShowFavourites(val));
  };

  
 
render(){
  // const {movies,search}=this.props.store.getState();//state is  {movies:{},search:{}}
  const {movies,search}=this.props;//as we are using connect above line changes as we are getting movies and search as props thorugh connect function 
console.log('movies',movies);
  const {list,favourites=[],showFavourites=[]}=movies 
  // console.log('RENDER',this.props.store.getState());
  // console.log('list',list);
  const displayMovies=showFavourites?favourites:list;

 /*
  return (
    <StoreContext.Consumer>
      {(store)=>{  //what ever is passed through provider can  be received by consumer.Hence store will be passed as argument by react calls this function . We can only user Consumer in render()
         return (
          <div className="App">
            <Navbar dispatch={this.props.store.dispatch} search={search} />
            <div className="main">
                    <div className="tabs">
                             <div className={`tab ${showFavourites?'':'active-tabs'}`} onClick={()=>this.onChangeTab(false)}>Movies </div>
                             <div className={`tab ${showFavourites?'active-tabs':''}`} onClick={()=>this.onChangeTab(true)}>Favourites </div>
                    </div>
                    <div className="list">
                         {
                        displayMovies.map((movie,index)=>(
                           // index gives the index of particular movie in database
                           <MovieCard 
                           movie={movie} 
                           key={`movies-${index}`} 
                            dispatch={this.props.store.dispatch} 
                            isFavourite={this.isMovieFavourite(movie)}
                            />
                         ))}
                    </div>
                    {displayMovies.length===0?<div className="no-movies">No movies to display!</div>:null}
            </div>
          </div>
        );
      }}
    </StoreContext.Consumer>
  )

  We are not using this Consumer like this in render() because our componentDidMount,isMovieFavourite function at the beginning also need access to store.So if we just give through StoreContext.Consumer then the components inside render() can only have access which will break our app 
  So what are we doing is we are wrapping the whole app component and we are sending store through that wrapper as props so that everything inside App can access store 
  hence we created 
  class AppWrapper extends React.Component{
*/
  return (
    <div className="App">
      <Navbar  search={search} />
      {/* Here we imported NavbarWrapper as Navbar. So when we send search as props it goes to NavbarWrapper so to grant original Navbar the access of search we have to send search as props via NavbarWrapper to Navbar in Navbar.js */}
      <div className="main">
              <div className="tabs">
                       <div className={`tab ${showFavourites?'':'active-tabs'}`} onClick={()=>this.onChangeTab(false)}>Movies </div>
                       <div className={`tab ${showFavourites?'active-tabs':''}`} onClick={()=>this.onChangeTab(true)}>Favourites </div>
              </div>
              <div className="list">
                   {
                  displayMovies.map((movie,index)=>(
                     // index gives the index of particular movie in database
                     <MovieCard 
                     movie={movie} 
                     key={`movies-${index}`} 
                      dispatch={this.props.dispatch} 
                      isFavourite={this.isMovieFavourite(movie)}
                      />
                   ))}
              </div>
              {displayMovies.length===0?<div className="no-movies">No movies to display!</div>:null}
      </div>
    </div>
  );
 
}



/*

class AppWrapper extends React.Component{
  render(){
    return(
      <StoreContext.Consumer>
        {(store)=><App store={store}/>}
        {//StoreContext.Consumer expeccts a call back function as redux sends the store as argument to the function  }
      </StoreContext.Consumer>
    )
  }
}
export default AppWrapper;
// we are exporting AppWrapper So that we can export App which has access to store 


Even this method is not scalable because we need to wrap the components everytime.
More efficient solution is using connect
*/

}
  

function mapStateToProps(state){
  return{
    movies:state.movies,
    search:state.search
    // we are fetching the desired quantities from the state 
  }
}
// const connectedAppComponent=connect(callback)(App);
const connectedAppComponent=connect(mapStateToProps)(App); //callback=mapStateToProps in react community 


//so the connect function will first return the state to callback function and callback function returns  the asked states and connect will pass the fetched states along with dispatch(default) to App component as props
//by this method one advantage is if search component changes only the onnected component will re-render instead of re-rendering whole component 
export default connectedAppComponent;
