import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Player from './Player';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class Team extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			primaryColour: '',
			secondaryColour: '',
			players: [],
			message: null
		}

		this.quantPlayers = 10;
		this.players = [];
		this.loadPlayers();
	}

	changeName = ({ target: { value } }) => this.setState({ name: value });
	changePrimaryColour = ({ target: { value } }) => this.setState({ primaryColour: value });
	changeSecondaryColour = ({ target: { value } }) => this.setState({ secondaryColour: value });

	addPlayer = (player) => {
		this.setState({ players: [...this.state.players, { ...player }] });
	}

	loadPlayers = () => {
		for (let i = 1; i <= this.quantPlayers; i++)
			this.players.push(<Player {...this.props} index={i} addPlayer={this.addPlayer} />)
	}

	createTeam = (event) => {
		event.preventDefault();
		const { players } = this.state;

		if (players.length === 0) {
			return this.setState({
				message: { title: "Ha ocurrido un error!", body: "No se puede ingresar un equipo sin jugadores." }
			});
		}

		alert('do staff');
	}

	render() {

		const { name, primaryColour, secondaryColour, message } = this.state;

		return (
			<div className="row">
				<div className="col-12">
					{
						message && (
							<div className='custom-alert'>
								<div className="alert alert-danger alert-dismissible fade show" role="alert">
									<strong>{message.title}</strong> {message.body}
									<button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => this.setState({ message: null })}>
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
							</div>
						)
					}
					<h2 className="text-center">Equipo</h2>
					<form onSubmit={this.createTeam}>
						<div className="form-group row">
							<label htmlFor="inputTeamName" className="col-sm-2 col-form-label">Nombre de equipo</label>
							<div className="col-sm-10">
								<input type="text" className="form-control" id="inputTeamName" placeholder="Nombre" value={name} onChange={this.changeName} required />
							</div>
						</div>
						<div className="form-group row">
							<label htmlFor="inputClolour" className="col-sm-2 col-form-label">Color de camiseta</label>
							<div className="col-sm-10">
								<input type="text" className="form-control" id="inputClolour" placeholder="Titular" value={primaryColour} onChange={this.changePrimaryColour} required />
							</div>
						</div>
						<div className="form-group row">
							<label htmlFor="inputSecondaryClolour" className="col-sm-2 col-form-label">Color de camiseta</label>
							<div className="col-sm-10">
								<input type="text" className="form-control" id="inputSecondaryClolour" placeholder="Alternativa" value={secondaryColour} onChange={this.changeSecondaryColour} />
							</div>
						</div>
						<div className='form-group'>
							{
								this.players.map((e, i) => (
									<Fragment key={i}>
										{e}
									</Fragment>
								))
							}
						</div>

						<div className="form-group row mt-2">
							<div className="col-sm-10">
								<button type="submit" className="btn btn-success"><FontAwesomeIcon icon={faPlus} />Crear</button>
							</div>
						</div>
					</form>
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

export default connect(mapStateToProps)(Team);
