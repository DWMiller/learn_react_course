import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EditFishForm extends Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    index: PropTypes.string.isRequired,
    updateFish: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
  };

  handleChange = event => {
    this.props.updateFish(this.props.index, {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  render() {
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          value={this.props.fish.name}
          placeholder="Fish Name"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="price"
          value={this.props.fish.price}
          placeholder="Fish Price"
          onChange={this.handleChange}
        />
        <select
          type="text"
          name="status"
          value={this.props.fish.status}
          placeholder="Fish Status"
          onChange={this.handleChange}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          type="text"
          name="desc"
          value={this.props.fish.desc}
          placeholder="Fish Desc"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="image"
          value={this.props.fish.image}
          placeholder="Fish Image"
          onChange={this.handleChange}
        />
        <button onClick={() => this.props.removeFish(this.props.index)}>
          Remove Fish
        </button>
      </div>
    );
  }
}
