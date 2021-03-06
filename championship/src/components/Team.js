import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Player from './Player';
import { createTeam as createTeamRedux } from '../redux/actions/teamActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class Team extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			primaryColor: '',
			secondaryColor: '',
			players: [],
			message: null,
			quantPlayers: 10,
			playersArr: []
		};

		this.loadPlayers();
	}

	changeName = ({ target: { value } }) => this.setState({ name: value });
	changePrimaryColor = ({ target: { value } }) =>
		this.setState({ primaryColor: value });
	changeSecondaryColor = ({ target: { value } }) =>
		this.setState({ secondaryColor: value });

	addPlayer = player => {
		this.setState({ players: [...this.state.players, { ...player }] });
	};

	loadPlayers = () => {
		for (let i = 1; i <= this.state.quantPlayers; i++)
			this.state.playersArr.push(
				<Player {...this.props} index={i} addPlayer={this.addPlayer} />
			);
	};

	createTeam = event => {
		event.preventDefault();
		const { players, name, primaryColor, secondaryColor } = this.state;
		const {
			user: { id }
		} = this.props;

		if (players.length === 0) {
			return this.setState({
				message: {
					title: 'Ha ocurrido un error!',
					body: 'No se puede ingresar un equipo sin jugadores.'
				}
			});
		}

		let body = { name, primaryColor, secondaryColor, players: [] };

		// TODO Se puede mejorar creo
		players.forEach(p => {
			body.players = [
				...body.players,
				{
					name: p.name,
					lastName: p.surname,
					birthDate: p.bornDate,
					number: p.numberPlayer
				}
			];
		});

		// Hit to API

		const miInit = {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(body)
		};

		fetch(`http://taller-frontend.herokuapp.com/api/team/${id}`, miInit)
			.then(resp => resp.json())
			.then(response => {
				if (!response.error) {
					this.props.dispatch(
						createTeamRedux({
							id: response._id,
							email: response.email,
							name: response.name
						})
					);

					setTimeout(() => {
						this.setState({
							message: {
								message: 'Ingreso existoso!',
								className: 'success'
							}
						});
					}, 1000);

					this.setState({
						name: '',
						primaryColor: '',
						secondaryColor: '',
						players: [],
						message: null,
						playersArr: []
					});
					this.loadPlayers();
				} else {
					this.setState({
						message: {
							message: 'Ha ocurrido un error!',
							className: 'danger'
						}
					});
				}
			})
			.catch(err => {
				this.setState({
					message: {
						message: 'Ha ocurrido un error!',
						className: 'danger'
					}
				});
			});
	};

	render() {
		const { name, primaryColor, secondaryColor, message } = this.state;

		return (
			<div className='row'>
				<div className='col-12'>
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
										this.setState({ message: null })
									}
								>
									<span aria-hidden='true'>&times;</span>
								</button>
							</div>
						</div>
					)}
					<h2 className='text-center'>Equipo</h2>
					<form onSubmit={this.createTeam}>
						<div className='form-group row'>
							<label
								htmlFor='inputTeamName'
								className='col-sm-2 col-form-label'
							>
								Nombre de equipo
							</label>
							<div className='col-sm-10'>
								<input
									type='text'
									className='form-control'
									id='inputTeamName'
									placeholder='Nombre'
									value={name}
									onChange={this.changeName}
									required
								/>
							</div>
						</div>
						<div className='form-group row'>
							<label
								htmlFor='inputClolour'
								className='col-sm-2 col-form-label'
							>
								Color de camiseta
							</label>
							<div className='col-sm-10'>
								<input
									type='text'
									className='form-control'
									id='inputClolour'
									placeholder='Titular'
									value={primaryColor}
									onChange={this.changePrimaryColor}
									required
								/>
							</div>
						</div>
						<div className='form-group row'>
							<label
								htmlFor='inputSecondaryClolour'
								className='col-sm-2 col-form-label'
							>
								Color de camiseta
							</label>
							<div className='col-sm-10'>
								<input
									type='text'
									className='form-control'
									id='inputSecondaryClolour'
									placeholder='Alternativa'
									value={secondaryColor}
									onChange={this.changeSecondaryColor}
								/>
							</div>
						</div>
						<div className='form-group'>
							{this.state.playersArr.map((e, i) => (
								<Fragment key={i}>{e}</Fragment>
							))}
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
