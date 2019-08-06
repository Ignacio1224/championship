import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = props => {
	const myStyle = { color: '#F0F0F0' };

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
			<a className='navbar-brand' href='localhost:3000'>
				Championship!
			</a>
			<div>
				<ul className='navbar-nav'>
					<li className='nav-item'>
						<NavLink
							to='/'
							exact
							activeStyle={myStyle}
							className='nav-link'
						>
							Log in
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink
							to='/manage-teams'
							activeStyle={myStyle}
							className='nav-link'
						>
							Administrar Equipos
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Header;
