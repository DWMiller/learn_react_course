import React, { Component } from 'react';

import sampleFishes from '../sample-fishes';
import base from '../base';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);

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

  addFish(fish) {
    const timestamp = Date.now();

    this.setState({
      fishes: {
        ...this.state.fishes,
        [`fish-${timestamp}`]: fish,
      },
    });
  }

  updateFish(id, fish) {
    this.setState({
      fishes: {
        ...this.state.fishes,
        [id]: fish,
      },
    });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes,
    });
  }

  addToOrder(key) {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  }

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
        />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          loadSamples={this.loadSamples}
        />
      </div>
    );
  }
}
