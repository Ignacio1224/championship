import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteUser } from '../redux/actions/userActions';
import { deleteChampionship } from '../redux/actions/championshipActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faLock } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: null
		};
	}

	logOut = () => {
		const {
			toggleIsLoggedIn,
			user: { id }
		} = this.props;

		const miInit = {
			method: 'POST',
			headers: { 'Content-type': 'application/json' }
		};

		fetch(
			`http://taller-frontend.herokuapp.com/api/user/logout/${id}`,
			miInit
		)
			.then(() => {
				this.props.history.push('/'); // Props is not defined! TODO!

				this.props.dispatch(deleteUser());

				this.props.dispatch(deleteChampionship());

				toggleIsLoggedIn();
			})
			.catch(err => {
				console.log(err);
				this.setState({
					message: {
						title: 'Ha ocurrido un error!',
						body:
							'Intente nuevamente y si el error persiste, contácte al administrador del sistema.'
					}
				});
			});
	};

	render() {
		const {
			user: { name }
		} = this.props;
		const { message } = this.state;

		return (
			<nav className='navbar navbar-expand navbar-dark bg-dark'>
				<Link className='navbar-brand' to='/championship'>
					Championship
				</Link>

				<div
					className='collapse navbar-collapse'
					id='navbarSupportedContent'
				>
					<ul className='navbar-nav mr-auto'>
						<li className='nav-item active'>
							<Link className='nav-link' to='/championship'>
								Campeonato
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/team'>
								Administrar equipo
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/match'>
								Ingresar partido
							</Link>
						</li>
					</ul>
					<div className='form-inline my-2 my-lg-0'>
						<span className='text-light'>
							<FontAwesomeIcon icon={faUserAlt} /> {name}
						</span>
						<button
							className='btn btn-link text-light mr-sm-2'
							onClick={this.logOut}
						>
							<FontAwesomeIcon icon={faLock} /> Log Out
						</button>
					</div>
				</div>
				{message && (
					<div className='custom-alert'>
						<div
							className='alert alert-danger alert-dismissible fade show'
							role='alert'
						>
							<strong>{message.title}</strong> {message.body}
							<button
								type='button'
								className='close'
								data-dismiss='alert'
								aria-label='Close'
								onClick={() => this.setState({ message: null })}
							>
								<span aria-hidden='true'>&times;</span>
							</button>
						</div>
					</div>
				)}
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.userReducer.user
	};
}

export default connect(mapStateToProps)(Header);
