import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMatch } from '../redux/actions/championshipActions';
import MatchTeam from './MatchTeam';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class Match extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: null,

			teamVsTeam: '',
			team1: '',
			team2: '',
			events: [],
			playersT1: [],
			playersT2: []
		};
	}

	getTeam = teamId => {
		const {
			team: { teams }
		} = this.props;

		for (const t of teams) {
			if (t._id === teamId) return t;
		}
	};

	loadInitialPlayers1 = p => {
		this.setState({ playersT1: [...this.state.playersT1, p] });
	};

	loadInitialPlayers2 = p => {
		this.setState({ playersT2: [...this.state.playersT2, p] });
	};

	createMatch = event => {
		event.preventDefault();

		const {
			team1,
			team2,
			playersT1,
			playersT2,
			teamVsTeam,
			events
		} = this.state;

		if (playersT1.length === 5 && playersT2.length === 5) {
			this.props.dispatch(
				updateMatch({
					_id: teamVsTeam,
					team1: {
						id: team1,
						players: playersT1
					},
					team2: {
						id: team2,
						players: playersT2
					},
					events
					// _id: teamVsTeam,
					// championshipId: this.props.championship.championship.id
				})
			);
			// const miInit = {
			// 	method: 'PUT',
			// 	headers: { 'Content-Type': 'application/json' },
			// 	body: JSON.stringify({
			// 		team1: {
			// 			id: team1,
			// 			players: playersT1
			// 		},
			// 		team2: {
			// 			id: team2,
			// 			players: playersT2
			// 		},
			// 		events
			// 		// _id: teamVsTeam,
			// 		// championshipId: this.props.championship.championship.id
			// 	})
			// };
			// // ERROR
			// fetch(
			// 	`http://taller-frontend.herokuapp.com/api/match/${teamVsTeam}`,
			// 	miInit
			// )
			// 	.then(res => res.json())
			// 	.then(response => {
			// 		if (!response.error) {
			// 			this.setState({
			// 				message: {
			// 					className: 'success',
			// 					title: 'Ok!',
			// 					message: 'Juego añadido!'
			// 				}
			// 			});
			// 		} else {
			// 			this.setState({
			// 				message: {
			// 					className: 'danger',
			// 					title: 'Error!',
			// 					message: response.error
			// 				}
			// 			});
			// 		}
			// 	})
			// 	.catch(err => {
			// 		console.log(err);
			// 		this.setState({
			// 			message: {
			// 				className: 'danger',
			// 				title: 'Error!',
			// 				message: err
			// 			}
			// 		});
			// 	});
		} else {
			this.setState({
				message: {
					className: 'danger',
					title: 'Error!',
					message: 'No ha completado todos los campos!'
				}
			});
		}
	};

	addEvents = ev => {
		this.setState({
			events: [...this.state.events, { ...ev }]
		});
	};

	changeTeamVsTeam = ({ target: { value } }) => {
		const { matches } = this.props.championship;

		let matchesFiltered = matches.filter(m => {
			return m._id === value;
		})[0];

		this.setState({
			teamVsTeam: value,
			team1: matchesFiltered.team1.id,
			team2: matchesFiltered.team2.id
		});
	};

	render() {
		const {
			championship: {
				championship: { isConfirmed },
				matches
			}
		} = this.props;

		const { teamVsTeam, message, team1, team2 } = this.state;

		return (
			<div className='row'>
				<div className='col-12'>
					<h2 className='text-center'>Partido</h2>
				</div>
				<div className='col-12 mt-5'>
					{isConfirmed ? (
						<form onSubmit={this.createMatch}>
							<div className='row'>
								<div className='col-6 offset-3 mb-3'>
									<select
										className='form-control'
										value={teamVsTeam}
										onChange={this.changeTeamVsTeam}
									>
										<option>------</option>
										{matches.map((m, i) => (
											<option key={i} value={m._id}>
												{this.getTeam(m.team1.id).name}
												{' VS '}
												{this.getTeam(m.team2.id).name}
											</option>
										))}
									</select>
								</div>

								{team1 !== '' && team2 !== '' && (
									<>
										<MatchTeam
											team={this.getTeam(team1)}
											addEvent={this.addEvents}
											loadInitialPlayers={
												this.loadInitialPlayers1
											}
										/>
										<MatchTeam
											team={this.getTeam(team2)}
											addEvent={this.addEvents}
											loadInitialPlayers={
												this.loadInitialPlayers2
											}
										/>
									</>
								)}
							</div>

							<div className='form-group row mt-2'>
								<div className='col-sm-10'>
									<button
										type='submit'
										className='btn btn-success'
									>
										<FontAwesomeIcon icon={faPlus} />
										Crear
									</button>
								</div>
							</div>

							{message && (
								<div className='custom-alert'>
									<div
										className={`alert alert-${
											message.className
										} alert-dismissible fade show`}
										role='alert'
									>
										<strong>{message.title}</strong>{' '}
										{message.message}
										<button
											type='button'
											className='close'
											data-dismiss='alert'
											aria-label='Close'
											onClick={() =>
												this.setState({
													message: null
												})
											}
										>
											<span aria-hidden='true'>
												&times;
											</span>
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
		championship: state.championshipReducer,
		team: state.teamReducer
	};
}

export default connect(mapStateToProps)(Match);
