import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Programs from './components/Programs';
import Login from './components/Login';
import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
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

  const [state, dispatch] = useReducer(reducer, store);

  return (
    <HashRouter baseName="stuflix">
      <div className="container">
        <h1 className="display-4 mb-4 mt-4">StuFlix</h1>
        <hr />
        <AppStateContext.Provider value={{state, dispatch}}>
          <Switch>
            <Route path="/" exact><Redirect to="/programs" /></Route>
            <Route path="/programs" render={() => {
              if (state.user) {
                return <Programs />
              } else {
                return <Redirect to="/login" />
              }
            }} />
            <Route path="/login"><Login /></Route>
          </Switch>
        </AppStateContext.Provider>
      </div>
    </HashRouter>
  );
}