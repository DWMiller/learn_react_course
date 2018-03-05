import React, { Component } from 'react';
import PropTypes from 'prop-types';

import sampleFishes from '../sample-fishes';
import base from '../base';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';

export default class App extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  };

  state = {
    fishes: {},
    order: {},
  };

  componentDidMount() {
    const localStorageRef = localStorage.getItem(
      this.props.match.params.storeId
    );

    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    this.setState({
      fishes: {
        ...this.state.fishes,
        [`fish-${Date.now()}`]: fish,
      },
    });
  };

  updateFish = (key, fish) => {
    this.setState({
      fishes: {
        ...this.state.fishes,
        [key]: fish,
      },
    });
  };

  removeFish = key => {
    this.setState({
      fishes: {
        ...this.state.fishes,
        [key]: null,
      },
    });
  };

  loadSamples = () => {
    this.setState({
      fishes: sampleFishes,
    });
  };

  addToOrder = key => {
    console.log(key);
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  removeFromOrder = key => {
    const order = { ...this.state.order };
    order[key] = order[key] > 1 ? order[key] - 1 : null;

    if (!order[key]) {
      // Setting to null works for firebase, not firebase needs deleting
      delete order[key];
    }

    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(key => {
              return (
                <Fish
                  key={key}
                  index={key}
                  details={this.state.fishes[key]}
                  addToOrder={this.addToOrder}
                />
              );
            })}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.match.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          loadSamples={this.loadSamples}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}
