import React, { Component } from "react";
import { connect } from "react-redux";
import MatchTeam from "./MatchTeam";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class Match extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,

      team1: "",
      team2: "",
      matchEventsT1: [],
      matchEventsT2: [],
      unavailableTeams: []
    };
  }

  changeTeam1 = ({ target: { value } }) => {
    this.setState({ team1: value, team2: '', unavailableTeams: [...this.state.unavailableTeams, value] });
    if (this.state.unavailableTeams.length > 0) {
      this.setState({ unavailableTeams: [value] });
    }
  };

  changeTeam2 = ({ target: { value } }) => this.setState({ team2: value });

  availableTeams = () => {
    const {
      team: { teams }
    } = this.props;

    let avialiable = [];

    teams.forEach((t, i) => {
      if (!this.state.unavailableTeams.includes(t._id))
        avialiable = [...avialiable, t];
    });

    return avialiable;
  };

  getTeam = teamId => {
    const {
      team: { teams }
    } = this.props;

    for (const t of teams) {
      if (t._id === teamId) return t;
    }
  };

  createMatch = event => {
    event.preventDefault();

    const { team1, team2 } = this.state;

    if (team1 !== "" && team2 !== "") {
      this.setState({
        message: {
          className: "success",
          title: "Sapee!",
          message: "Pin y verde pari!"
        }
      });
    } else {
      this.setState({
        message: {
          className: "danger",
          title: "Error!",
          message: "No ha completado todos los campos!"
        }
      });
    }
    // console.log(team1, team2);
  };

  addEventT1 = ev => {
    this.setState({ matchEventsT1: [...this.state.matchEventsT1, { ...ev }] });
  };

  addEventT2 = ev => {
    this.setState({ matchEventsT2: [...this.state.matchEventsT2, { ...ev }] });
  };

  render() {
    const {
      //   championship: { isConfirmed }
      team: { teams }
    } = this.props;

    const { team1, team2, message, matchEventsT1, matchEventsT2 } = this.state;
    const avTeams = this.availableTeams();
    console.log(matchEventsT1);


    let isConfirmed = true; // TODO HARCODED!!!

    return (
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Partido</h2>
        </div>
        <div className="col-12 mt-5">
          {isConfirmed ? (
            <form onSubmit={this.createMatch}>
              <div className="row">
                <div className="form-group col-5">
                  <label htmlFor="selectMatchTeam1">Equipo 1</label>
                  <select
                    className="form-control"
                    id="selectMatchTeam1"
                    onChange={this.changeTeam1}
                    value={team1}
                  >
                    <option value="">------</option>
                    {teams.map((tmp, index) => (
                      <option key={index} value={tmp._id}>
                        {tmp.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-5 offset-1">
                  <label htmlFor="selectMatchTeam2">Equipo 2</label>
                  <select
                    className="form-control"
                    id="selectMatchTeam2"
                    onChange={this.changeTeam2}
                    value={team2}
                    disabled={avTeams.length === teams.length}
                  >
                    <option value="">------</option>
                    {avTeams.map((tmp, index) => (
                      <option key={index} value={tmp._id}>
                        {tmp.name}
                      </option>
                    ))}
                  </select>
                </div>

                {team1 !== "" && team2 !== "" && (
                  <>
                    <MatchTeam
                      team={this.getTeam(team1)}
                      addEvent={this.addEventT1}
                    />
                    <MatchTeam
                      team={this.getTeam(team2)}
                      addEvent={this.addEventT2}
                    />
                  </>
                )}
              </div>
              {
                (matchEventsT1.length > 0 || matchEventsT2.length > 0) && (
                  <div className='col-12 mt-2'>
                    <h5 className='text-center'>Eventos registrados</h5>
                    
                    <div className="col-5">
                      {matchEventsT1.map((e, i) => (
                        <div key={i} className="alert alert-primary" role='alert'>
                          {e.minute} - {e.mEvent}
                        </div>
                      ))}
                    </div>
                    
                    <div className="col-5 offset-1">
                      {matchEventsT2.map((e, i) => (
                        <div key={i} className="alert alert-primary" role='alert'>
                          {e.minute} - {e.mEvent}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }
              
              <div className="form-group row mt-2">
                <div className="col-sm-10">
                  <button type="submit" className="btn btn-success">
                    <FontAwesomeIcon icon={faPlus} />
                    Crear
                  </button>
                </div>
              </div>

              {message && (
                <div className="custom-alert">
                  <div
                    className={`alert alert-${
                      message.className
                      } alert-dismissible fade show`}
                    role="alert"
                  >
                    <strong>{message.title}</strong> {message.message}
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      aria-label="Close"
                      onClick={() =>
                        this.setState({
                          message: null
                        })
                      }
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
              <h1>No se ha iniciado el campeonato!.</h1>
            )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    championship: state.championshipReducer.championship,
    team: state.teamReducer
  };
}

export default connect(mapStateToProps)(Match);
