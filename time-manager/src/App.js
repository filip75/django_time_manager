import React, {Component} from 'react';
import './App.css';
import {NavLink, Router, Switch} from 'react-router-dom'
import projectsContainer from "./containers/projects";
import RegisterForm from "./containers/registerForm";
import LoginForm from "./containers/loginForm";
import {history} from "./browserHistory"
import {connect} from "react-redux";
import {logout} from "./actions/auth";
import {AuthForbiddenRoute, AuthRequiredRoute} from "./components/authRequiredRoute";


class App extends Component {
    render() {
        return (
            <Router history={history}>

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand">Navbar</span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar navbar-nav mr-auto">
                            <li>
                                <NavLink to='/projects' className='nav-item nav-link'>projects</NavLink>
                            </li>
                        </ul>

                        <ul className="navbar navbar-nav navbar-right">
                            {this.props.isAuthenticated ?
                                <NavLink to='/' className='nav-item nav-link'
                                         onClick={this.props.logout}> logout</NavLink>
                                :
                                <>
                                    <li>
                                        <NavLink to='/register' className='nav-item nav-link'>register</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/login' className='nav-item nav-link'>login</NavLink>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </nav>

                <Switch>
                    <div className="container">
                        <AuthRequiredRoute exact path="/projects" component={projectsContainer}
                                           isAuthenticated={this.props.isAuthenticated}/>
                        <AuthForbiddenRoute exact path="/register" component={RegisterForm}
                                            isAuthenticated={this.props.isAuthenticated}/>
                        <AuthForbiddenRoute exact path="/login" component={LoginForm}
                                            isAuthenticated={this.props.isAuthenticated}/>
                    </div>
                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return {isAuthenticated: state.auth.token != null}
};

const mapDispatchToProps = dispatch => {
    return {logout: () => dispatch(logout())}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
