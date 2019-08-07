import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LogIn from './components/LogIn';
import Championship from './components/Championship';
import PageNotFound from './components/PageNotFound';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: false
		};
	}

	toggleIsLoggedIn = () => {
		const { isLoggedIn } = this.state;
		this.setState({ isLoggedIn: !isLoggedIn });
	};

	render() {
		const { isLoggedIn } = this.state;
		return (
			<>
				<Switch>
					<Route
						exact
						path="/"
						render={props => (
							<LogIn {...props} toggleIsLoggedIn={this.toggleIsLoggedIn} />
						)}
					/>
					{
						isLoggedIn && (
							<Route
								exact
								path="/championship"
								render={props => (
									<Championship
										{...props}
										toggleIsLoggedIn={this.toggleIsLoggedIn}
									/>
								)}
							/>
						)
					}
					<Route component={PageNotFound} />
				</Switch>
			</>
		);
	}
}

export default App;
