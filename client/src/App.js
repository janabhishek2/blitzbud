import React, { Component } from "react";
import jwtDecode from "jwt-decode";

import Navbar from "./components/navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/home";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import Managers from "./components/managers";
import NotFound from "./components/notfound";
import Profile from "./components/profile";
class App extends Component {
  state = {
    user: {},
  };
  async componentDidMount() {
    try {
      const token = localStorage.getItem("token");
      const user = jwtDecode(token);

      this.setState({ user });
    } catch (err) {}
  }
  render() {
    return (
      <React.Fragment>
        <Navbar user={this.state.user} />
        <div className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/managers" component={Managers} />
            <Route path="/profile" component={Profile} />
            <Route path="/" component={Home} />
            <Redirect to="/notfound" component={NotFound} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
