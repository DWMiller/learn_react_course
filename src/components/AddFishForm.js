import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddFishForm extends Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFish = event => {
    event.preventDefault();

    this.props.addFish({
      name: this.nameRef.value.value,
      price: parseFloat(this.priceRef.value.value),
      status: this.statusRef.value.value,
      desc: this.descRef.value.value,
      image: this.imageRef.value.value,
    });

    this.fishForm.reset();
  };

  render() {
    return (
      <form
        ref={input => (this.fishForm = input)}
        className="fish-edit"
        onSubmit={this.createFish}
      >
        <input
          name="name"
          ref={this.nameRef}
          type="text"
          placeholder="Fish Name"
        />
        <input
          name="price"
          ref={this.priceRef}
          type="text"
          placeholder="Fish price"
        />
        <select name="status" ref={this.statusRef}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          ref={this.descRef}
          type="text"
          placeholder="Fish Desc"
        />
        <input
          name="image"
          ref={this.imageRef}
          type="text"
          placeholder="Fish Image"
        />
        <button type="submit">Add Item</button>
      </form>
    );
  }

  static propTypes = {
    addFish: PropTypes.func.isRequired,
  };
}

export default AddFishForm;
