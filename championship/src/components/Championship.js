import React, { Component } from 'react';
import { connect } from "react-redux";
import Header from './Header';
import Stadistics from './Stadistics';


class Championship extends Component {

	constructor(props) {
		super(props);
	}

	startChampionship = () => {
		alert('Do Staff!');
	}

	render() {
		const { toggleIsLoggedIn, championship: { isConfirmed } } = this.props;
		
		return (
			<>
				<Header {...this.props} toggleIsLoggedIn={toggleIsLoggedIn} />
				<div className='container mt-5'>
					<div className='row'>
						<div className='col-12'>
							<h2 className='text-center'>Campeonato</h2>
						</div>
						<div className='col-12 mt-5'>
							<h4 className='d-inline'>Estado del campeonato: </h4>
							{
								isConfirmed ? 
									(
										<span>Iniciado</span>
									) : (
										<span>
											No iniciado
											<button className='btn btn-primary ml-4' onClick={this.startChampionship}>Iniciar campeonato</button>
										</span>
									)
							}
							
						</div>
						<Stadistics {...this.props} />
					</div>
				</div>
			</>
		);
	}
}

function mapStateToProps(state) {

	return {
		user: state.userReducer.user,
		championship: state.championshipReducer.championship
	};
}

export default connect(mapStateToProps)(Championship);
