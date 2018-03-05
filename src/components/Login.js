import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Login extends Component {
  static propTypes = {
    authenticate: PropTypes.func.isRequired,
  };

  render() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button
          className="github"
          onClick={() => this.props.authenticate('Github')}
        >
          Log In With Github
        </button>
        <button
          className="facebook"
          onClick={() => this.props.authenticate('Facebook')}
        >
          Log In With Facebook
        </button>
        <button
          className="twitter"
          onClick={() => this.props.authenticate('Twitter')}
        >
          Log In With Twitter
        </button>
      </nav>
    );
  }
}
