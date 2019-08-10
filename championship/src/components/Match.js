import React, { Component } from 'react';
import { connect } from 'react-redux';
import MatchTeam from './MatchTeam';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class Match extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: null,

			team1: '',
			team2: ''
		};

		this.quantityTeams = new Array(2);
		this.unavailableTeams = [];
	}

	changeTeam1 = ({ target: { value } }) => {
		this.setState({ team1: value });
		this.unavailableTeams = [...this.unavailableTeams, value];
	};

	changeTeam2 = ({ target: { value } }) => this.setState({ team2: value });

	availableTeams = () => {
		const {
			team: { teams }
		} = this.props;
		let avialiable = [];

		teams.forEach(t => {
			if (!this.unavailableTeams.includes(t._id))
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

		if (team1 !== '' && team2 !== '') {
			this.setState({
				message: {
					className: 'success',
					title: 'Sapee!',
					message: 'Pin y verde pari!'
				}
			});
		} else {
			this.setState({
				message: {
					className: 'danger',
					title: 'Error!',
					message: 'No ha completado todos los campos!'
				}
			});
		}
		console.log(team1, team2);
	};

	render() {
		const {
			//   championship: { isConfirmed }
			team: { teams }
		} = this.props;

		const { team1, team2, message } = this.state;
		const avTeams = this.availableTeams();

		console.log('Team reducer', teams);

		let isConfirmed = true; // TODO HARCODED!!!

		return (
			<div className='row'>
				<div className='col-12'>
					<h2 className='text-center'>Partido</h2>
				</div>
				<div className='col-12 mt-5'>
					{isConfirmed ? (
						<form onSubmit={this.createMatch}>
							<div className='row'>
								<div className='form-group col-5'>
									<label htmlFor='selectMatchPlayer1'>
										Equipo 1
									</label>
									<select
										className='form-control'
										id='selectMatchPlayer1'
										onChange={this.changeTeam1}
										value={team1}
									>
										<option value=''>------</option>
										{teams.map((tmp, index) => (
											<option key={index} value={tmp._id}>
												{tmp.name}
											</option>
										))}
									</select>
								</div>
								<div className='form-group col-5 offset-1'>
									<label htmlFor='selectMatchPlayer2'>
										Equipo 2
									</label>
									<select
										className='form-control'
										id='selectMatchPlayer2'
										onChange={this.changeTeam2}
										value={team2}
										disabled={
											avTeams.length === teams.length
										}
									>
										<option value=''>------</option>
										{/* TODO change teams to avTeams */}
										{teams.map((tmp, index) => (
											<option key={index} value={tmp._id}>
												{tmp.name}
											</option>
										))}
									</select>
								</div>

								{team1 !== '' && team2 !== '' && (
									<>
										<MatchTeam team={this.getTeam(team1)} />
										<MatchTeam team={this.getTeam(team2)} />
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
		championship: state.championshipReducer.championship,
		team: state.teamReducer
	};
}

export default connect(mapStateToProps)(Match);
