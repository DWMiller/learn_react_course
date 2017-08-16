import React, { Component } from 'react';
import PropTypes from 'prop-types';

import sampleFishes from '../sample-fishes';
import base from '../base';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fishes: {},
      order: {},
    };
  }

  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });

    const localStorageRef = localStorage.getItem(
      `order-${this.props.params.storeId}`
    );

    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef),
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(
      `order-${this.props.params.storeId}`,
      JSON.stringify(nextState.order)
    );
  }

  addFish = fish => {
    const timestamp = Date.now();

    this.setState({
      fishes: {
        ...this.state.fishes,
        [`fish-${timestamp}`]: fish,
      },
    });
  };

  updateFish = (id, fish) => {
    this.setState({
      fishes: {
        ...this.state.fishes,
        [id]: fish,
      },
    });
  };

  removeFish = id => {
    this.setState({
      fishes: {
        ...this.state.fishes,
        [id]: null,
      },
    });
  };

  loadSamples = () => {
    this.setState({
      fishes: sampleFishes,
    });
  };

  addToOrder = id => {
    const order = { ...this.state.order };
    order[id] = order[id] + 1 || 1;
    this.setState({ order });
  };

  removeFromOrder = id => {
    const order = { ...this.state.order };
    order[id] = order[id] > 1 ? order[id] - 1 : null;

    if (!order[id]) {
      // Setting to null works for firebase, not firebase needs deleting
      delete order[id];
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
                  addToOrder={this.addToOrder}
                  key={key}
                  index={key}
                  {...this.state.fishes[key]}
                />
              );
            })}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          loadSamples={this.loadSamples}
        />
      </div>
    );
  }
}

App.propTypes = {
  params: PropTypes.object.isRequired,
};
