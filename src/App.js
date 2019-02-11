import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import ProjectDetails from './components/projects/ProjectDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateProject from './components/projects/CreateProject'
import ListItem from './components/notes/NoteItem'
import Landingpage from './components/landingpage/Landingpage'
class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
 
          <Switch>
            <Route exact path="/" component={Landingpage} />
            <Route path="/project/:id" component={ProjectDetails} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/create" component={CreateProject} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>

        </div>
      </BrowserRouter>
    ); 
  }
}

export default App;
