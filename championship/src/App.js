import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LogIn from "./components/LogIn";
import Header from "./components/Header";
import Championship from "./components/Championship";
import Team from "./components/Team";
import Match from './components/Match';
import PageNotFound from "./components/PageNotFound";

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
    const { history } = this.props;
    ;
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
          {isLoggedIn && (
            <>
              <Header history={history} toggleIsLoggedIn={this.toggleIsLoggedIn} />
              <div className="container mt-5">
                <Route
                  exact
                  path="/championship"
                  render={props => (
                    <Championship
                      {...props}
                    />
                  )}
                />
                <Route
                  exact
                  path="/team"
                  render={props => <Team {...props} />}

                />

                <Route exact path='/match' render={props => <Match {...props} /> } />
              </div>
            </>
          )}
          <Route component={PageNotFound} />
        </Switch>
      </>
    );
  }
}

export default App;
