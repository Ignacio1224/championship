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

		const { player, minute, mEvent } = this.state;
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

		addEvent({
			player,
			minute,
			mEvent
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

	render() {
		const { player, minute, mEvent, message } = this.state;

		const {
			team: { name, players }
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
												this.setState({ message: null })
											}
										>
											<span aria-hidden='true'>
												&times;
											</span>
										</button>
									</div>
								</div>
							)}
							<div className='form-group'>
								<label
									htmlFor={`selectMatchPlayer${
										player.number
									}`}
								>
									Jugador
								</label>
								<select
									className='form-control'
									id={`selectMatchPlayer${player.number}`}
									onChange={this.changePlayer}
									value={player}
								>
									<option value=''>------</option>
									{players.map((p, index) => (
										<option key={index} value={p.number}>
											Nombre: {p.name} Apellido:{' '}
											{p.lastName} Nº camiseta: {p.number}
										</option>
									))}
								</select>
								<label htmlFor={`selectMinute${player.number}`}>
									Minuto
								</label>
								<input
									type='number'
									min='1'
									className='form-control'
									id={`selectMinute${player.number}`}
									onChange={this.changeMinute}
									value={minute}
								/>
								<label htmlFor={`selectEvent${player.minute}`}>
									Evento
								</label>
								<select
									className='form-control'
									id={`selectEvent${player.minute}`}
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
			</div>
		);
	}
}

export default MatchTeam;
