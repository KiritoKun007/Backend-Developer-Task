import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="navbar-fixed">
          <nav className="z-depth-1">
            <div className="nav-wrapper deep-purple darken-4">
              <Link
                to="/"
                style={{
                  fontFamily: "monospace",
                }}
                className="col s5 brand-logo center deep-purple-text text-lighten-5"
              >
                <i className="material-icons">code</i>
                Developer Task
              </Link>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Navbar;
