import React, { Component } from 'react';

import { formatPrice } from '../helpers';

export class Fish extends Component {
  render() {
    const { name, price, desc, image, status, index } = this.props;

    const isAvailable = status === 'available';
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';

    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">
            {formatPrice(price)}
          </span>
        </h3>
        <p>
          {desc}
        </p>
        <button
          disabled={!isAvailable}
          onClick={() => this.props.addToOrder(index)}
        >
          {buttonText}
        </button>
      </li>
    );
  }
}

export default Fish;
