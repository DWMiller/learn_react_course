import React, { Component } from 'react';

import Header from './Header';
import Menu from './Menu';
import Inventory from './Inventory';
import Order from './Order';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.addFish = this.addFish.bind(this);

    this.state = {
      fishes: {},
      order: {},
    };
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

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    );
  }
}
