import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Programs from './components/Programs';
import Login from './components/Login';
import { useReducer } from 'react';

/*
 * a reducer function is used both by useReducer and by Redux
 * its job is to transform (create a new version of) the state based on some action
 * it accepts two args:
 * 1. a ref to the current version of the state
 * 2. a ref to an action object; each action object has a type and a payload
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      // return a new version of the store with an updated user
      const {user, accessToken} = action.payload;
      return {...state, user, accessToken};
    case 'USER_LOGGED_OUT':
      return {...state, user: null, accessToken: null};
    default:
      return state;
  }
}

const store = {
  user: null,
  accessToken: null
};

export const AppStateContext = React.createContext();

export default function App() {

  /*
   * useReducer is an alternative to Redux for complex state management
   * it accepts two args:
   * 1. a ref to your reducer function (see above)
   * 2. the initial value for the store
   * it returns an array comprising two elements:
   * 1. a ref to the store
   * 2. a ref to a function for dispatching actions
   */
  const [state, dispatch] = useReducer(reducer, store);

  return (
    <BrowserRouter>
      <div className="container">
        <h1 className="display-4 mb-4 mt-4">StuFlix</h1>
        <hr />
        <AppStateContext.Provider value={{state, dispatch}}>
          <Switch>
            <Route path="/" exact><Redirect to="/programs" /></Route>
            <Route path="/programs" render={() => {
              if (state.user) {
                // the user is logged in
                return <Programs />
              } else {
                // the user is not logged in
                return <Redirect to="/login" />
              }
            }} />
            <Route path="/login"><Login /></Route>
          </Switch>
        </AppStateContext.Provider>
      </div>
    </BrowserRouter>
  );
}