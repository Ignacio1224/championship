import React, { Component } from "react";
import {createUser, createChampionship} from "../redux/actions/Actions";
import { connect } from "react-redux";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "ignaciocabrera1224@gmail.com",
      name: "Ignacio Cabrera",
      password: "123123123",
	    confirmPassword: "123123123",
	    message: null,
    };
  }

  changeEmail = ({ target: { value } }) => this.setState({ email: value });

  changename = ({ target: { value } }) => this.setState({ name: value });

  changePassword = ({ target: { value } }) =>
    this.setState({ password: value });

  changeConfirmPassword = ({ target: { value } }) =>
    this.setState({ confirmPassword: value });

  register = event => {
    event.preventDefault();
	const { email, name, password, confirmPassword } = this.state;
	const { toggleIsLoggedIn } = this.props;

    if (email !== "" && name !== "" && password !== "" && confirmPassword === password) {

		const miInit = { 
			method: 'POST',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify({
				email,
				name,
				password
			})
		};

		fetch('http://taller-frontend.herokuapp.com/api/user',miInit)
		.then(resp => resp.json())
		.then((response) => {
			
			this.setState({message: {message: 'Se ha registrado!', className: 'success'}});
			this.props.dispatch(createUser({ id: response._id, name: response.name }));
			this.props.dispatch(createChampionship({ id: response.championship._id, isConfirmed: response.championship.isConfirmed }));
			toggleIsLoggedIn();
			setTimeout(() => {
				
				this.props.history.push('/championship');
			}, 1200);	
		})
		.catch((err) => {
			this.setState({message: {message: 'Ha ocurrido un error!', className: 'danger'}});
		});
    } else {
	  this.setState({message: {message: 'Los datos ingresados no son correctos!', className: 'danger'}});
    }
  };

  render() {
    const { email, name, password, confirmPassword, message } = this.state;

    return (
      <div className="col-md-6 register-form">
        <h3>Registrarme</h3>
        <form onSubmit={this.register}>
			{
				message && <div className={`alert alert-${message.className}`} role="alert"> {message.message} </div> 
			}
			
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email *"
              value={email}
              onChange={this.changeEmail}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              value={name}
              onChange={this.changename}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña *"
              value={password}
              onChange={this.changePassword}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Confirmar Contraseña *"
              value={confirmPassword}
              onChange={this.changeConfirmPassword}
            />
          </div>
          <div className="form-group">
            <input type="submit" className="btnSubmit" value="Registrarme" />
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(Register);
