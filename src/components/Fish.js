import React from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../helpers';

const Fish = props => {
  const { name, price, desc, image, status } = props.details;

  const isAvailable = status === 'available';
  const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';

  return (
    <li className="menu-fish">
      <img src={image} alt={name} />
      <h3 className="fish-name">
        {name}
        <span className="price">{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p>
      <button
        disabled={!isAvailable}
        onClick={() => props.addToOrder(props.index)}
      >
        {buttonText}
      </button>
    </li>
  );
};

Fish.propTypes = {
  details: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
  }),
  index: PropTypes.string.isRequired,
  addToOrder: PropTypes.func.isRequired,
};

export default Fish;
