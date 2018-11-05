import React, {Component} from 'react';

//defines navbar class and renders components to page
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <img className="logo" src="/public/images/sqrl_white.png"/>
        <div className="navbar-usercount">{this.props.usercount} users online</div>
      </nav>
    );
  }
}

export default NavBar;