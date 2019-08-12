import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faLock } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {

		render() {
		const {
			user: { name }
		} = this.props;

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
						<Link
							className='btn btn-link text-light mr-sm-2'
							to='/'
						>
							<FontAwesomeIcon icon={faLock} /> Log Out
						</Link>
					</div>
				</div>
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
