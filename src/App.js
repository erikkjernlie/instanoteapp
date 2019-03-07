import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import ListItem from './components/notes/NoteItem'
import Landingpage from './components/landingpage/Landingpage'
import Instanote from './components/notes/Instanote'
import Chat from './chatComponents/Chat'
import InstaChat from './chatComponents/InstaChat'
import './index.css'
class App extends Component {

  state = {
    instaChat: false,
  }
  // TO DO:

  // https://blueprintjs.com/docs/#core/components/toast - implement toaster when added and deleting notes

  componentWillMount() {
    if (window.location.href.includes('/chat/')) {
      this.setState({
        instaChat: true,
      })
    } else if (window.location.href.endsWith('/chat')) {
      this.setState({
        instaChat: true,
      })
    }
  }
  render() {
    return (
      <BrowserRouter>
        {this.state.instaChat ?
          <div className="App">
            <Switch>
              <Route path="/chat/:id" component={Chat} />
              <Route path="/chat/" component={InstaChat} />
            </Switch>

        </div>
        :
        <div className="App">
          <Navbar />

          <div className="app_container">
            <Switch>
              <Route exact path="/" component={Landingpage} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/chat/:id" component={Chat} />
              <Route path="/chat/" component={InstaChat} />
              <Route path="/:id" component={Instanote} />
            </Switch>
          </div>

        </div>
        }
        
      </BrowserRouter>
    );
  }
}

export default App;
