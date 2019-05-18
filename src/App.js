import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import NavigationBar from "./NavigationBar";
import { Jumbotron } from "./Jumbotron";
import { Layout } from "./Layout";
import Register from "./Register";
import AuthService from "./AuthService";

class App extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      token: this.Auth.getToken,
      loggedIn: this.Auth.loggedIn()
    };
  }
  refreshAuth() {
    this.setState({
      token: this.Auth.getToken,
      loggedIn: this.Auth.loggedIn()
    });
  }
  logout() {
    this.Auth.logout();
    this.refreshAuth();
  }

  login(email, password, props) {
    this.Auth.login(email, password)
      .then(res => {
        this.refreshAuth();
        props.history.replace("/");
      })
      .catch(err => {
        alert(err);
      });
  }

  signup(email, name, username, password, props) {
    this.Auth.signup(email, name, username, password)
      .then(res => {
        this.login(email, password, props);
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <NavigationBar
            userInfo={this.Auth.getProfile()}
            loggedIn={this.state.loggedIn}
            logout={() => this.logout()}
          />
          <Jumbotron />
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                path="/accounts/login"
                render={props => (
                  <Login
                    {...props}
                    login={(email, password, props) => {
                      this.login(email, password, props);
                    }}
                    loggedin={this.state.loggedIn}
                  />
                )}
              />
              <Route
                path="/accounts/register"
                render={props => (
                  <Register
                    {...props}
                    signup={(email, name, username, password, props) => {
                      this.signup(email, name, username, password, props);
                    }}
                    loggedin={this.state.loggedIn}
                  />
                )}
              />

              <Route path="/:handle" render={props => <Profile {...props} />} />
            </Switch>
          </Layout>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
//<Route path="/profile" component={Profile} />
