import React, { Component } from 'react';
import Header from './Header';


class Championship extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {toggleIsLoggedIn} = this.props;

		return (
			<>
			<Header {...this.props} toggleIsLoggedIn={toggleIsLoggedIn} />
			<h1>PEPE</h1>
			</>
		);
	}
}

export default Championship;
