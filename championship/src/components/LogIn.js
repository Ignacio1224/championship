import React from 'react';
import { Link } from 'react-router-dom';

class LogIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: ''
		};
	}

	changeUsername = ({ target: { value } }) =>
		this.setState({ username: value });

	changePassword = ({ target: { value } }) =>
		this.setState({ password: value });

	login = event => {
		event.preventDefault();
		const { username, password } = this.state;

		if (username !== '' && password !== '') {
			this.props.history.push('/todolist');
			this.setState({ username: '', password: '' });
		} else {
			alert('Campos incorrectos');
		}
	};

	render() {
		const { username, password } = this.state;

		return (
			<div id='login-body'>
				<div id='login'>
					<div className='container'>
						<div
							id='login-row'
							className='row justify-content-center align-items-center'
						>
							<div id='login-column' className='col-md-6'>
								<div id='login-box' className='col-md-12'>
									<form
										id='login-form'
										className='form'
										onSubmit={this.login}
									>
										<h3 className='text-center text-info'>
											Login
										</h3>
										<div className='form-group'>
											<label
												htmlFor='username'
												className='text-info'
											>
												Username:
											</label>
											<br />
											<input
												type='text'
												name='username'
												id='username'
												value={username}
												onChange={this.changeUsername}
												className='form-control'
											/>
										</div>
										<div className='form-group'>
											<label
												htmlFor='password'
												className='text-info'
											>
												Password:
											</label>
											<br />
											<input
												type='text'
												name='password'
												id='password'
												value={password}
												onChange={this.changePassword}
												className='form-control'
											/>
										</div>
										<div className='form-group'>
											<button className='btn btn-info btn-md mr-4'>
												Log In
											</button>
											<Link to='register'>
												Registrarme
											</Link>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LogIn;
