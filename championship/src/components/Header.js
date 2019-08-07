import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faLock } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { deleteUser } from "../redux/actions/userActions";
import { deleteChampionship } from "../redux/actions/championshipActions";
import SweetAlert from 'sweetalert2-react';

class Header extends Component {

	constructor(props) {
		super(props);

		this.state = {
			message: null
		}
	}

	logOut = () => {

		const { toggleIsLoggedIn, user: { id } } = this.props;

		const miInit = {
			method: "POST",
			headers: { "Content-type": "application/json" }
		};

		fetch(`http://taller-frontend.herokuapp.com/api/user/logout/${id}`, miInit)
		.then(() => {
			toggleIsLoggedIn();

			this.props.dispatch(
				deleteUser()
			);

			this.props.dispatch(
				deleteChampionship()
			);

			this.props.history.push("/");
		})
		.catch(err => {
			this.setState({
				message: { title: "Ha ocurrido un error!", body: "Intente nuevamente y si el error persiste, contácte al administrador del sistema." }
			});
		});
	}

	render() {
		const { user: { name } } = this.props;
		const {message} = this.state;

		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<a className="navbar-brand" href="/championship">
					Championship
        </a>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<a className="nav-link" href="/championship">
								Home <span className="sr-only">(current)</span>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/championship">
								Ingresar equipo
              				</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/championship">
								Listado equipos
              				</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/championship">
								Ingresar partido
              				</a>
						</li>
					</ul>
					<div className="form-inline my-2 my-lg-0">
						<span className="text-light">
							<FontAwesomeIcon icon={faUserAlt} /> {name}
						</span>
						<button className="btn btn-link text-light mr-sm-2" onClick={this.logOut}>
							<FontAwesomeIcon icon={faLock} /> Log Out
            			</button>
					</div>
				</div>
				{
					message &&
					<SweetAlert
						show={!!message}
						title={message.title}
						text={message.body}
						onConfirm={() => this.setState({ message: null })}
					/>
				}
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
