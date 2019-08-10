import React, { Component } from 'react';
import { connect } from 'react-redux';

class Stadistics extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tab: 'positions'
		};
	}

	setTab = ({ target: { id } }) => {
		this.setState({ tab: id });
	};

	render() {
		const { tab } = this.state;
		const {
			team: { positions, scorers, fairPlay }
		} = this.props;

		return (
			<div className='col-12 mt-5'>
				<h4>Estadísticas</h4>

				<div className='col-12'>
					<ul className='nav nav-tabs mt-3'>
						<li
							className={`${tab === 'positions' &&
								'element-active'}`}
						>
							<span
								className='btn btn-link'
								id='positions'
								onClick={this.setTab}
							>
								Posiciones
							</span>
						</li>
						<li
							className={`${tab === 'scorers' &&
								'element-active'}`}
						>
							<span
								className='btn btn-link'
								id='scorers'
								onClick={this.setTab}
							>
								Goleadores
							</span>
						</li>
						<li
							className={`${tab === 'fairPlay' &&
								'element-active'}`}
						>
							<span
								className='btn btn-link'
								id='fairPlay'
								onClick={this.setTab}
							>
								Fair play
							</span>
						</li>
					</ul>

					<div className='tab-content mt-2'>
						{tab === 'positions' && (
							<div className='mt-3'>
								<h5>Posiciones</h5>

								{positions.length === 0 ? (
									'No hay datos.'
								) : (
									<table className='mt-1 table table-striped'>
										<thead>
											<tr>
												<th scope='col'>Equipo</th>
												<th scope='col'>Puntos</th>
												<th scope='col'>
													Goles a favor
												</th>
												<th scope='col'>
													Goles en contra
												</th>
												<th scope='col'>
													Diferencia de goles
												</th>
											</tr>
										</thead>
										<tbody />
									</table>
								)}
							</div>
						)}
						{tab === 'scorers' && (
							<div className='mt-3 '>
								<h5>Scorers</h5>
								{scorers.length === 0 ? (
									'No hay datos.'
								) : (
									<table className='mt-1 table table-striped'>
										<thead>
											<tr>
												<th scope='col'>Nombre</th>
											</tr>
										</thead>
										<tbody />
									</table>
								)}
							</div>
						)}
						{tab === 'fairPlay' && (
							<div className='mt-3'>
								<h5>Fair Play</h5>
								{fairPlay.length === 0 ? (
									'No hay datos.'
								) : (
									<table className='mt-1 table table-striped'>
										<thead>
											<tr>
												<th scope='col'>Equipo</th>
											</tr>
										</thead>
										<tbody />
									</table>
								)}
							</div>
						)}
					</div>
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

export default connect(mapStateToProps)(Stadistics);
