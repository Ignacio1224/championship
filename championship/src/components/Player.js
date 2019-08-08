import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SweetAlert from "sweetalert2-react";
import { stat } from "fs";

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      surname: "",
      bornDate: "",
      numberPlayer: "",
      added: false,
      message: null
    };
  }

  changeName = ({ target: { value } }) => this.setState({ name: value });
  changeSurname = ({ target: { value } }) => this.setState({ surname: value });
  changeBornDate = ({ target: { value } }) =>
    this.setState({ bornDate: value });
  changeNumberPlayer = ({ target: { value } }) =>
    this.setState({ numberPlayer: value });

  createPlayer = event => {
    event.preventDefault();
    const { addPlayer } = this.props;
    const { state } = this;

    if (state.name === '' || state.surname === '' || state.bornDate === '' || state.numberPlayer === '') {
        return this.setState({
            message: { title: "Oooops!", body: "No se puede ingresar un jugador sin datos." }
        });
    }


    this.setState({ added: true });
    addPlayer({
      name: state.name,
      surname: state.surname,
      bornDate: state.bornDate,
      numberPlayer: state.numberPlayer
    });
  };

  render() {
    const {
      name,
      surname,
      bornDate,
      numberPlayer,
      added,
      message
    } = this.state;
    const { index } = this.props;

    return (
      <div className="card mt-2">
        <div className="card-body">
          <div className="card-title">
            <h3 className="text-justified">{`Jugador ${index}`}</h3>
          </div>
          <div className="card-text">
            <div className="form-group row">
              <label
                htmlFor={`inputPlayerName${index}`}
                className="col-sm-2 col-form-label"
              >
                Nombre del jugador
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id={`inputPlayerName${index}`}
                  placeholder="Nombre"
                  value={name}
                  onChange={this.changeName}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor={`inputSurname${index}`}
                className="col-sm-2 col-form-label"
              >
                Apellido
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id={`inputSurname${index}`}
                  placeholder="Apellido"
                  value={surname}
                  onChange={this.changeSurname}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor={`inputPlayerBornDate${index}`}
                className="col-sm-2 col-form-label"
              >
                Fecha de nacimiento
              </label>
              <div className="col-sm-10">
                <input
                  type="date"
                  className="form-control"
                  id={`inputPlayerBornDate${index}`}
                  placeholder="Fecha de nacimiento"
                  value={bornDate}
                  onChange={this.changeBornDate}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor={`inputPlayerNumber${index}`}
                className="col-sm-2 col-form-label"
              >
                Número de camiseta
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  min="1"
                  className="form-control"
                  id={`inputPlayerNumber${index}`}
                  placeholder="Número de camiseta"
                  value={numberPlayer}
                  onChange={this.changeNumberPlayer}
                />
              </div>
            </div>
          </div>
        </div>
        {!added && (
          <div className="form-group row mt-2">
            <div className="col-sm-11 text-right">
              <button
                type="submit"
                className="btn btn-success"
                onClick={this.createPlayer}
              >
                <FontAwesomeIcon icon={faPlus} />
                Agregar
              </button>
            </div>
          </div>
        )}

        {message && (
          <SweetAlert
            show={!!message}
            title={message.title}
            text={message.body}
            onConfirm={function () {this.setState({ message: null })}}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    championship: state.championshipReducer.championship
  };
}

export default connect(mapStateToProps)(Player);
