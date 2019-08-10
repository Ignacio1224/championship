import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stadistics from './Stadistics';
import { createChampionship } from '../redux/actions/championshipActions';

class Championship extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: null
		};
	}

	startChampionship = () => {
		const {
			user: { id },
			championship
		} = this.props;

		if (!championship.isConfirmed) {
			const miInit = {
				method: 'POST',
				headers: { 'Content-type': 'application/json' }
			};

			fetch(
				`http://taller-frontend.herokuapp.com/api/user/confirmChampionship/${id}`,
				miInit
			)
				.then(resp => resp.json())
				.then(response => {
					if (!response.reason) {
						this.props.dispatch(
							createChampionship({
								id: championship.id,
								isConfirmed: true
							})
						);
						this.setState({
							message: {
								title: 'Exito!',
								body: 'Se ha iniciado el campeonato.',
								className: 'success'
							}
						});
					} else {
						this.setState({
							message: {
								title: 'Oooops!',
								body: response.reason,
								className: 'danger'
							}
						});
					}
				});
		}
	};

	render() {
		const {
			championship: { isConfirmed }
		} = this.props;

		const { message } = this.state;

		return (
			<div className='row'>
				<div className='col-12'>
					<h2 className='text-center'>Campeonato</h2>
					{message && (
						<div className='custom-alert'>
							<div
								className={`alert alert-${
									message.className
								} alert-dismissible fade show`}
								role='alert'
							>
								<strong>{message.title}</strong> {message.body}
								<button
									type='button'
									className='close'
									data-dismiss='alert'
									aria-label='Close'
									onClick={() =>
										this.setState({ message: null })
									}
								>
									<span aria-hidden='true'>&times;</span>
								</button>
							</div>
						</div>
					)}
				</div>
				<div className='col-12 mt-5'>
					<h4 className='d-inline'>Estado del campeonato: </h4>
					{isConfirmed ? (
						<span>Iniciado</span>
					) : (
						<span>
							No iniciado
							<button
								className='btn btn-primary ml-4'
								onClick={this.startChampionship}
							>
								Iniciar campeonato
							</button>
						</span>
					)}
				</div>
				{isConfirmed && <Stadistics {...this.props} />}
			</div>
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
