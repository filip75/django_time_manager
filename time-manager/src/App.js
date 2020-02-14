import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom'
import Projects from './pages/projects'
import ProjectPage from './pages/projectPage'

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand" href="#">Navbar</span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink to='/' className='nav-item nav-link' activeClassName='active'>projects</NavLink>
                        </div>
                    </div>
                </nav>
                <Switch>
                    <Route exact path="/" component={Projects}/>
                    <Route path="/project_detail" component={ProjectPage}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
