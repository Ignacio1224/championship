import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LogIn from './components/LogIn';
// import Register from './components/Register';
import Championship from './components/Championship';
import PageNotFound from './components/PageNotFound';

class App extends Component {
	render() {
		return (
			<>
				<Switch>
					<Route exact path='/' component={LogIn} />
					<Route path='/championship' component={Championship} />
					<Route component={PageNotFound} />
				</Switch>
			</>
		);
	}
}

export default App;
