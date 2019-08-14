import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class MatchTeam extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: null,

			// {player: id, time: time, event}
			// event could be ('goal, yellow card, red card')
			teamPlayers: [],
			availablePlayers: [...props.team.players], // TODO: Not updating at change cmbx
			pp: '',
			player: '',
			minute: '',
			mEvent: ''
		};

		this.matchEvents = ['Gol', 'Tarjeta amarilla', 'Expulsión'];
	}

	changePlayer = ({ target: { value } }) => this.setState({ player: value });
	changeMinute = ({ target: { value } }) => this.setState({ minute: value });
	changeEvent = ({ target: { value } }) => this.setState({ mEvent: value });

	addLine = event => {
		event.preventDefault();

		let { player, minute, mEvent } = this.state;
		const { addEvent } = this.props;

		if (player === '' || minute === '' || mEvent === '') {
			return this.setState({
				message: {
					title: 'Oooops!',
					message: 'Faltan datos!',
					className: 'danger'
				}
			});
		}

		if (mEvent === this.matchEvents[0]) {
			mEvent = 'GOAL';
		}
		if (mEvent === this.matchEvents[1]) {
			mEvent = 'YELLOW_CARD';
		}
		if (mEvent === this.matchEvents[2]) {
			mEvent = 'RED_CARD';
		}

		addEvent({
			playerId: player,
			minute,
			type: mEvent
		});

		return this.setState({
			message: {
				title: 'Correcto!',
				message: 'Se ingresaron los datos!',
				className: 'success'
			},
			player: '',
			minute: '',
			mEvent: ''
		});
	};

	changeTeamPlayer = ({ target: { value } }) => {
		this.setState({ pp: value });
	};

	addPlayer = event => {
		event.preventDefault();
		if (this.state.pp !== '') {
			this.setState({
				teamPlayers: [...this.state.teamPlayers, this.state.pp]
			});
			this.loadAvailablePlayers(this.state.pp);
		}
	};

	loadAvailablePlayers = player => {
		const { loadInitialPlayers } = this.props;

		this.setState({
			availablePlayers: [
				...this.state.availablePlayers.filter(p =>
					player ? p._id !== player : p._id
				)
			]
		});
		loadInitialPlayers(player);
	};

	render() {
		const {
			pp,
			availablePlayers,
			player,
			minute,
			mEvent,
			message
		} = this.state;

		const {
			team: { name, players, _id }
		} = this.props;

		return (
			<div className='col-6'>
				<div className='card'>
					<div className='card-body'>
						<div className='card-title'>
							<h4>{`Equipo ${name}`}</h4>
						</div>
						<div className='card-text'>
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

							{/* Players started the match */}
							{availablePlayers.length > 0 && (
								<div className='form-group'>
									<label htmlFor={`PIP${_id}`}>
										Jugadores que iniciaron el partido
									</label>
									<select
										className='form-control'
										onChange={this.changeTeamPlayer}
										value={pp}
										id={`PIP${_id}`}
									>
										<option value=''>------</option>
										{availablePlayers.map((p, index) => (
											<option key={index} value={p._id}>
												{p.name} {p.lastName}{' '}
												{`(${p.number})`}
											</option>
										))}
									</select>
									<button
										type='submit'
										className='btn btn-primary'
										onClick={this.addPlayer}
									>
										<FontAwesomeIcon icon={faPlus} />
										Agregar
									</button>
								</div>
							)}

							<div className='form-group'>
								<label htmlFor={`selectMatchPlayer${_id}`}>
									Jugador
								</label>
								<select
									className='form-control'
									id={`selectMatchPlayer${_id}`}
									onChange={this.changePlayer}
									value={player}
								>
									<option value=''>------</option>
									{players.map((p, index) => (
										<option key={index} value={p._id}>
											{p.name} {p.lastName}{' '}
											{`(${p.number})`}
										</option>
									))}
								</select>
							</div>
							<div className='form-group'>
								<label htmlFor={`selectMinute${_id}`}>
									Minuto
								</label>
								<input
									type='number'
									min='1'
									className='form-control'
									id={`selectMinute${_id}`}
									onChange={this.changeMinute}
									value={minute}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor={`selectEvent${_id}`}>
									Evento
								</label>
								<select
									className='form-control'
									id={`selectEvent${_id}`}
									onChange={this.changeEvent}
									value={mEvent}
								>
									<option value=''>------</option>
									{this.matchEvents.map((e, index) => (
										<option key={index} value={`${e}`}>
											{e}
										</option>
									))}
								</select>
							</div>
							<div className='form-group row mt-2'>
								<div className='col-sm-10'>
									<button
										type='submit'
										className='btn btn-primary'
										onClick={this.addLine}
									>
										<FontAwesomeIcon icon={faPlus} />
										Añadir
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MatchTeam;
