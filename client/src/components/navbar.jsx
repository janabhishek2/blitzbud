import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
    const user = this.props.user;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary d-flex">
        <Link to="/" className="navbar-brand mr-auto m-2">
          Home
        </Link>
        <ul className="navbar-nav m-2">
          {Object.keys(user).length > 0 && user.isAdmin == true && (
            <li className="nav-item">
              <Link to="/managers" className="nav-link">
                Managers
              </Link>
            </li>
          )}
        </ul>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav m-2">
            {Object.keys(user).length == 0 && (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            )}
            {Object.keys(user).length == 0 && (
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            )}
            {Object.keys(user).length > 0 && (
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  {user.name}
                </Link>
              </li>
            )}
            {Object.keys(user).length > 0 && (
              <li className="nav-item">
                <Link to="/logout" className="nav-link">
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
