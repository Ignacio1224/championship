import React, { Component } from "react";
import { connect } from "react-redux";
import Stadistics from "./Stadistics";


class Championship extends Component {
  constructor(props) {
    super(props);
  }

  startChampionship = () => {
    alert("Do Staff!");
  };

  render() {
    const {
      championship: { isConfirmed }
    } = this.props;

    return (

          <div className="row">
            <div className="col-12">
              <h2 className="text-center">Campeonato</h2>
            </div>
            <div className="col-12 mt-5">
              <h4 className="d-inline">Estado del campeonato: </h4>
              {isConfirmed ? (
                <span>Iniciado</span>
              ) : (
                <span>
                  No iniciado
                  <button
                    className="btn btn-primary ml-4"
                    onClick={this.startChampionship}
                  >
                    Iniciar campeonato
                  </button>
                </span>
              )}
            </div>
            <Stadistics {...this.props} />
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

export default connect(mapStateToProps)(Championship);
