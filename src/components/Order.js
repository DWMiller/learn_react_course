import React, { Component } from 'react';

import { formatPrice } from '../helpers';

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(id) {
    const fish = this.props.fishes[id];
    const count = this.props.order[id];

    const price = fish.price * count;

    if (!fish || fish.status === 'unavailable') {
      return (
        <li key={id}>
          Sorry, {fish ? fish.name : 'fish'} is no longer available
        </li>
      );
    }

    return (
      <li key={id}>
        <span>
          {count}lbs {fish.name}
        </span>
        <span className="price">
          {formatPrice(price)}
        </span>
      </li>
    );
  }

  render() {
    const { fishes, order } = this.props;
    const orderIds = Object.keys(order);

    const total = orderIds.reduce((total, id) => {
      const fish = fishes[id];
      const count = order[id];
      const isAvailable = fish && fish.status === 'available';

      if (isAvailable) {
        return total + count * fish.price || 0;
      }

      return total;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
    );
  }
}
