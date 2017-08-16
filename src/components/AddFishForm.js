import React, { Component } from 'react';

export class AddFishForm extends Component {
  constructor(props) {
    super();
    this.createFish = this.createFish.bind(this);
  }

  createFish(event) {
    event.preventDefault();

    this.props.addFish({
      name: this.fishForm.name.value,
      price: this.fishForm.price.value,
      status: this.fishForm.status.value,
      desc: this.fishForm.desc.value,
      image: this.fishForm.image.value,
    });

    this.fishForm.reset();
  }

  render() {
    return (
      <form
        ref={input => (this.fishForm = input)}
        className="fish-edit"
        onSubmit={this.createFish}
      >
        <input name="name" type="text" placeholder="Fish Name" />
        <input name="price" type="text" placeholder="Fish price" />
        <select name="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" type="text" placeholder="Fish Desc" />
        <input name="image" type="text" placeholder="Fish Image" />
        <button type="submit">Add Item</button>
      </form>
    );
  }
}

export default AddFishForm;