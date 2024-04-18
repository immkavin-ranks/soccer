import React from "react";
import axios from "axios";
import "./App.css";
import PlayerForm from "./Player/PlayerForm";
import PlayerList from "./Player/PlayerList";
import PlayerSingle from "./Player/PlayerSingle";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      currentPlayer: {},
    };

    this.updateCurrentPlayer = this.updateCurrentPlayer.bind(this);
    this.fetchPlayers = this.fetchPlayers.bind(this); // Bind fetchPlayers method
  }

  componentDidMount() {
    this.fetchPlayers(); // Fetch initial list of players
  }

  fetchPlayers() {
    const url = "http://localhost:4000/players";

    axios
      .get(url)
      .then((Response) => {
        this.setState({
          players: Response.data,
        });
      })
      .catch((error) => console.error(error));
  }

  updateCurrentPlayer(item) {
    this.setState({
      currentPlayer: item,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <nav>
            <div className="nav-wrapper blue darken-1">
              <a href="/" className="brand-logo">
                Soccer Management
              </a>
            </div>
          </nav>
        </div>
        <div className="row">
          <div className="col s3">
            <PlayerList
              players={this.state.players}
              updateCurrentPlayer={this.updateCurrentPlayer}
            />
          </div>
          <div className="col s9">
            <PlayerSingle player={this.state.currentPlayer} />
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <PlayerForm fetchPlayers={this.fetchPlayers} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
