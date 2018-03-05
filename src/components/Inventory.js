import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import base, { firebaseApp } from '../base';

import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';

export default class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.object.isRequired,
    addFish: PropTypes.func.isRequired,
    loadSamples: PropTypes.func.isRequired,
    updateFish: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      uid: null,
      owner: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  authHandler = async authData => {
    const store = await base.fetch(this.props.storeId, { context: this });

    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      });
    }

    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  renderInventory = key => {
    const fish = this.props.fishes[key];
    return (
      <EditFishForm
        key={key}
        index={key}
        fish={fish}
        updateFish={this.props.updateFish}
        removeFish={this.props.removeFish}
      />
    );
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;

    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you aren't the owner of this store</p>
          {logout}
        </div>
      );
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    );
  }
}
