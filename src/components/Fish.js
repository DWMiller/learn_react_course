import React from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../helpers';

const Fish = props => {
  const { name, price, desc, image, status, index } = props;

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
      <button disabled={!isAvailable} onClick={() => props.addToOrder(index)}>
        {buttonText}
      </button>
    </li>
  );
};

Fish.propTypes = {
  addToOrder: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  desc: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
};

export default Fish;
