import React, { Component } from "react";
import { connect } from "react-redux";


class Match extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    // const {
    //   championship: { isConfirmed }
    // } = this.props;

    let isConfirmed = true;

    return (

          <div className="row">
            <div className="col-12">
              <h2 className="text-center">Partido</h2>
            </div>
            <div className="col-12 mt-5">
              {
                  isConfirmed ? ('do staff') : (<h1>No se ha iniciado el campeonato!.</h1>)
              }
            </div>
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

export default connect(mapStateToProps)(Match);
