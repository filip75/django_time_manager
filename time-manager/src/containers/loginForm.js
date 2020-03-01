import React, {Component} from "react";
import {authLogin} from "../actions/auth";
import {connect} from "react-redux";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let {from} = this.props.location.state || {from: {pathname: '/'}};
        this.props.onLogin(this.state.username, this.state.password, from);
    };

    render() {
        return (
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>user name</label>
                        <input value={this.state.username} className="form-control" name="username"
                               onChange={this.handleInput} disabled={this.props.loading}/>
                        <p className="formError">{'username' in this.props.error ? this.props.error.username : "\u00a0"}</p>
                    </div>
                    <div className="form-group">
                        <label>password</label>
                        <input value={this.state.password} className="form-control" name="password" type="password"
                               onChange={this.handleInput} disabled={this.props.loading}/>
                        <p className="formError">{'password' in this.props.error ? this.props.error.password : "\u00a0"}</p>
                    </div>
                    <p className="formError">{'non_field_errors' in this.props.error ? this.props.error.non_field_errors : "\u00a0"}</p>
                    <button type="submit" className="btn btn-secondary" style={{width: 100 + '%'}}
                            disabled={this.props.loading}>login
                    </button>
                </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.auth.loginError,
        loading: state.auth.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (username, password, redirect) => dispatch(authLogin(username, password, redirect))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);