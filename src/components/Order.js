import React, { Component } from 'react';

import { formatPrice } from '../helpers';

import CSSTransitionGroup from 'react-addons-css-transition-group';

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(id) {
    const fish = this.props.fishes[id];
    const count = this.props.order[id];

    const removeButton = (
      <button onClick={() => this.props.removeFromOrder(id)}>&times;</button>
    );

    if (!fish || fish.status === 'unavailable') {
      return (
        <li key={id}>
          Sorry, {fish ? fish.name : 'fish'} is no longer available
          {removeButton}
        </li>
      );
    }

    const price = fish.price * count;

    return (
      <li key={id}>
        <span>
          <CSSTransitionGroup
            component="span"
            className="count"
            transitionName="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >
            <span key={count}>
              {count}
            </span>
          </CSSTransitionGroup>
          lbs {fish.name} {removeButton}
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
        <CSSTransitionGroup
          className="order"
          component="ul"
          transitionName="order"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </CSSTransitionGroup>
      </div>
    );
  }
}
