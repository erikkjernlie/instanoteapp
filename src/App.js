import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, HashBrowser } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import ListItem from './components/notes/NoteItem'
import Landingpage from './components/landingpage/Landingpage'
import Landingpage2 from './components/landingpage/Landingpage2'
import Instanote from './components/notes/Instanote'
import './index.css'
class App extends Component {


  // TO DO:

  // https://blueprintjs.com/docs/#core/components/toast - implement toaster when added and deleting notes

  componentWillMount() {

  }
  render() {
    return (
      <BrowserRouter>

        <div className="App">
          <Navbar />

          <div className="app_container">
            <Switch>
              <Route exact path="/" component={Landingpage2} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/:id" component={Instanote} />
            </Switch>
          </div>

        </div>


      </BrowserRouter>
    );
  }
}

export default App;
