import React, { Component } from 'react';
import Header from './Header';


class Championship extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<>
			<Header {...this.props} />
			<h1>PEPE</h1>
			</>
		);
	}
}

export default Championship;
