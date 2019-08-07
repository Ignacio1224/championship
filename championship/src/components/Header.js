import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faLock } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
	  const {user: {email}} = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/championship">
          Championship
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/championship">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/championship">
                Ingresar equipo
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/championship">
                Listado equipos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/championship">
                Ingresar partido
              </a>
            </li>
          </ul>
          <div className="form-inline my-2 my-lg-0">
            <span className="text-light">
              <FontAwesomeIcon icon={faUserAlt} /> {email}
            </span>
            <button className="btn btn-link text-light mr-sm-2">
              <FontAwesomeIcon icon={faLock} /> Log Out
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.championships.user
  };
}

export default connect(mapStateToProps)(Header);
