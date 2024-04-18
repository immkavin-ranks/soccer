import React from "react";
import axios from "axios";

class PlayerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitPlayer = this.submitPlayer.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  submitPlayer(event) {
    event.preventDefault();
    axios
      .post("http://localhost:4000/players", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
      })
      .then(() => {
        // After successfully adding a new player, fetch the updated list of players
        this.props.fetchPlayers();
        // Reset form fields
        this.setState({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        });
      })
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <div className="row">
        <h1 className="center">Add a new player</h1>
        <form action="" onSubmit={this.submitPlayer} className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="input-field col s6">
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
              <label htmlFor="lastName">Last Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input
                type="text"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s6">
              <input
                type="text"
                id="phone"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
              />
              <label htmlFor="phone">Phone</label>
            </div>
          </div>
          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Add Player
          </button>
        </form>
      </div>
    );
  }
}

export default PlayerForm;
