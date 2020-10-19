import React from "react";
import { NavLink, Link } from "react-router-dom";
import {connect} from "react-redux"
import {logout} from "./redux/actions"

// Logo
import logo from "./assets/theindex.svg";

const Sidebar = (props) => (
  <div id="sidebar">
    <img src={logo} className="logo" alt="the index logo" />
    <section>
      <h4 className="menu-item active">
        <NavLink to="/authors">AUTHORS</NavLink>
      </h4>
    </section>
    
    { props.user ? (
    <div className="fixed-bottom">
      <button className="btn btn-danger m-2 float-left" onClick={props.logout}>
        Logout {props.user.username}
      </button>
    </div>
    ) : (
      <div className="fixed-bottom">
        <Link to="/login" className="btn btn-info m-2 float-left">
          Login
        </Link>
        <Link to="/signup" className="btn btn-success m-2 float-left">
          Signup
        </Link>
      </div>
      )
    }
    
    
  </div>
);

const mapStateToProps = state => {
  return (
    {
      user: state.user
    }
  )
}

const mapDispatchToProps = dispatch => {
  return (
    {
      logout: () => dispatch(logout())
    }
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(Sidebar);
