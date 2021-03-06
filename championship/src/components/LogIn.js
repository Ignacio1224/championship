import React from 'react';
import Register from './Register';
import { connect } from 'react-redux';
import { createUser, deleteUser } from '../redux/actions/userActions';
import {
	createChampionship,
	deleteChampionship,
	createMatches
} from '../redux/actions/championshipActions';
import { MATCHES } from '../Matches';
import { giveMatchesStadistics } from '../Utils';
import { createTeam, deleteTeam } from '../redux/actions/teamActions';
// import { Link } from "react-router-dom";

class LogIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: 'ignaciocabrera1224@gmail.com',
			password: '123123123',
			message: null,
			userId: null,
			championshipId: null
		};

		this.logOut();
	}

	logOut() {
		const { user, toggleIsLoggedIn } = this.props;

		if (user) {
			const miInit = {
				method: 'POST',
				headers: { 'Content-type': 'application/json' }
			};

			fetch(
				`http://taller-frontend.herokuapp.com/api/user/logout/${
					user.id
				}`,
				miInit
			)
				.then(() => {
					toggleIsLoggedIn();
					this.props.dispatch(
						deleteTeam(),
						deleteChampionship(),
						deleteUser()
					);
				})
				.catch(err => {});
		}
	}

	loadMatchesHit = championshipId => {
		const miInit = {
			method: 'GET',
			headers: { 'Content-type': 'application/json' }
		};

		return fetch(
			`http://taller-frontend.herokuapp.com/api/match/getAllByChampionshipId/${championshipId}`,
			miInit
		)
			.then(resp => resp.json())
			.then(response => {
				if (!response.error) {
					// this.props.dispatch(createMatches([...response]));
					this.props.dispatch(createMatches([...MATCHES]));
					giveMatchesStadistics([...MATCHES], this.props.team);
				}
			});
	};

	logInHit = (email, password) => {
		const miInit = {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({
				email,
				password
			})
		};

		fetch('http://taller-frontend.herokuapp.com/api/user/login', miInit)
			.then(resp => resp.json())
			.then(response => {
				this.props.dispatch(
					createUser({
						id: response._id,
						email: response.email,
						name: response.name
					})
				);

				this.props.dispatch(
					createChampionship({
						id: response.championship._id,
						isConfirmed: response.championship.isConfirmed
					})
				);

				this.loadTeamsHit(response.championship._id).then(() => {
					this.loadMatchesHit(response.championship._id).then(() => {
						const { toggleIsLoggedIn } = this.props;
						toggleIsLoggedIn();
						this.setState({
							email: '',
							password: ''
						});
						this.props.history.push('/championship');
					});
				});
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

	loadTeamsHit = championshipId => {
		return fetch(
			`http://taller-frontend.herokuapp.com/api/team/getAllByChampionshipId/${championshipId}`,
			{
				method: 'GET',
				headers: {
					'Content-type': 'application/json'
				}
			}
		)
			.then(resC => resC.json())
			.then(responseC => {
				if (!responseC.error) {
					responseC.forEach(t => {
						this.props.dispatch(
							createTeam({
								...t
							})
						);
					});
				}
			});
	};

	setUserId = userId => this.setState({ userId });
	setChampionshipId = championshipId => this.setState({ championshipId });

	changeEmail = ({ target: { value } }) => this.setState({ email: value });

	changePassword = ({ target: { value } }) =>
		this.setState({ password: value });

	login = event => {
		event.preventDefault();
		const { email, password } = this.state;

		if (email !== '' && password !== '') {
			this.logInHit(email, password);
		} else {
			this.setState({
				message: {
					message: 'Los datos ingresados no son correctos!',
					className: 'danger'
				}
			});
		}
	};

	render() {
		const { email, password, message } = this.state;
		return (
			<div className='container login-container'>
				<div className='row'>
					<div className='col-md-6 login-form'>
						<h3>Acceder</h3>
						<form onSubmit={this.login}>
							{message && (
								<div
									className={`alert alert-${
										message.className
									}`}
									role='alert'
								>
									{' '}
									{message.message}{' '}
								</div>
							)}
							<div className='form-group'>
								<input
									type='text'
									className='form-control'
									placeholder='Email *'
									value={email}
									onChange={this.changeEmail}
								/>
							</div>
							<div className='form-group'>
								<input
									type='password'
									className='form-control'
									placeholder='Contraseña *'
									value={password}
									onChange={this.changePassword}
								/>
							</div>
							<div className='form-group'>
								<input
									type='submit'
									className='btnSubmit'
									value='Acceder'
								/>
							</div>
						</form>
					</div>
					<Register
						{...this.props}
						toggleIsLoggedIn={this.props.toggleIsLoggedIn}
					/>
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

export default connect(mapStateToProps)(LogIn);
