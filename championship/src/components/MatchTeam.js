import React, { Component } from 'react';

class MatchTeam extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: null
		};
	}

	render() {
		const {
			team: { name }
		} = this.props;

		return (
			<div className='col-6'>
				<div className='card'>
					<div className='card-body'>
						<div className='card-title'>
							<h4>{`Equipo ${name}`}</h4>
						</div>
						<div className='card-text'>todos los inputs xdd</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MatchTeam;
