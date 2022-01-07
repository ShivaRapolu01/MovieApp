import React from 'react';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'


import './index.css';
import App from './components/App';
import rootReducer from './reducers'

/*
//function logger(obk,next,action )
// https://www.notion.so/middleware-14984623c89045b183f23ce78cfa17a7
const logger=function({dispatch,getState}){
  return function(next){
    return function(action){
      //middleware code
      console.log('ACTION_TYPE = ',action.type);
      next(action); //this next statement is very important as this will pass the action to next middleware if no other middleware is present to the next then it will pass it to dispatch.Middleware can manipulate the state 
    }
  }
}
// curried form of function logger (obj, next, action) {} //what is currying https://www.notion.so/currying-7f66f28feb624380b30f1c2acc6a68ad
//make logger function as middleware https://www.notion.so/Modifying-middleware-96d638b4387e4e038dba4a994963ec97 

*/
const logger=({dispatch,getState})=>(next)=>(action)=>{
  //logger code
  //my middleware
  if(typeof action!=='function'){
    console.log('ACTION_TYPE =',action.type);
  }
  console.log('ACTION', action);


  next(action);
}

/*
const thunk=({dispatch,getState})=>(next)=>(action)=>{
  //logger code
  if(typeof action==='function'){
    action(dispatch);
    return; 
  }
  next(action);
}
Instead of this function we have in-built thunk middleware. this is the code which redux gives for thunk
*/


const store=createStore(rootReducer,applyMiddleware(logger,thunk));//takes reducer as argument and applyMiddleware(this says redux that we want to use middleware and the middleware is passed as argument to this )
console.log('store',store);

/*
export const StoreContext =createContext();

console.log('StoreContext',StoreContext);

context is in-built in react-redux package 


class Provider extends React.Component{
  render(){
    const {store}=this.props;
   return  <StoreContext.Provider value={store}> 
          {this.props.children} 
          {//this.props.children will be the components which are wrapper by Provider class here only 1 component is wrapped so <app > is the children component  }
    </StoreContext.Provider> 
    
  }
}
 
we have an in-built function in react-redux package to do the same job. the above is the hard-coded version of it
*/

/* 
console.log('BEFORE state',store.getState());
store.dispatch({  
  //dispatch takes action as argument and sends the defined action to reducer
  //defining  the action
  type:'ADD_MOVIES',
  movies:[{name:'Superman'}]
  //using dispatch we send actions to reducers indirectly sending message to the store 
})
console.log('AFTER state',store.getState());
*/


//const connectedAppComponent=connect(callback)(App);

/*

there is in-built connect function in react-redux package which has the same functionality of below code 
export function connect(callback){
  return function(Component){
     class ConnectedComponent extends React.Component{
    // return class ConnectedComponent extends React.Component{

      constructor(props){
        super(props);
       this.unsubscribe= this.props.store.subscribe(()=>{this.forceUpdate();});//to make changes reflect
     //subscribe function return a unsubscribe function which when called unsubscribes the store preventing memory leak
     
      }

      componentWillUnmount(){
        this.unsubscribe();
     //subscribe function return a unsubscribe function which when called unsubscribes the store preventing memory leak

      }
      //to get access to store we wrapped this component 
      render(){

        
        /*
         return (<StoreContext.Consumer>
           {(store) => {
             const state=store.getState();
             const dataToBePassedAsProps=callback(state);
             return (<Component {...dataToBePassedAsProps} dispatch={store.dispatch}/>)//this is equalent to below line 
            //  return <Component movies={movies} search={search} dispatch={store.dispatch} />

           }}
         </StoreContext.Consumer>);
         * /

         const {store}=this.props; 
         const state=store.getState();
         const dataToBeSentAsProps=callback(state);
         return (<Component {...dataToBeSentAsProps} dispatch={store.dispatch}/>)//this is equalent to below line 
        //  return <Component movies={movies} search={search} dispatch={store.dispatch} />

      }
    }
    
    class ConnectedComponentWrapper extends React.Component{
  render(){
    return(
      <StoreContext.Consumer>
      {(store)=>{ return <ConnectedComponent store={store}/>}}
    </StoreContext.Consumer>
    );
    
  }

}
return ConnectedComponentWrapper;

  }
};

*/

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}> 

    {/* Here value must be passed as props in <StoreContext.Provider value={store}>  we can't change name of value key.If we want to give another name for value key  we can create our onw Provider class .Hence we have created a provider class and passed the store with a desired key */}
    {/* Here we are wrapping App component to StoreContext.Provider .By doing this all the descendents of App component and App component itself will be able to access the props given by wrapper(here provider)*/}
       <App  />
       </Provider>  

    {/* Sending store as prop to App */}


  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
