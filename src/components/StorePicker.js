import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getFunName } from '../helpers';

class StorePicker extends Component {
  goToStore = event => {
    event.preventDefault();
    this.context.router.transitionTo(`/store/${this.storeInput.value}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
          ref={input => {
            this.storeInput = input;
          }}
        />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

StorePicker.contextTypes = {
  router: PropTypes.object,
};

export default StorePicker;
