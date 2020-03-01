import React, {Component} from "react";
import {authRegister} from "../actions/auth";
import {connect} from "react-redux";

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password1: '',
            password2: ''
        };
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onRegister(this.state.username, this.state.email, this.state.password1, this.state.password2);
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
                    <label>e-mail</label>
                    <input value={this.state.email} className="form-control" name="email" onChange={this.handleInput}
                           disabled={this.props.loading}/>

                    <p className="formError">{'email' in this.props.error ? this.props.error.email : "\u00a0"}</p>
                </div>
                <div className="form-group">
                    <label>password</label>
                    <input value={this.state.password1} className="form-control" name="password1" type="password"
                           onChange={this.handleInput} disabled={this.props.loading}/>
                    <p className="formError">{'password1' in this.props.error ? this.props.error.password1 : "\u00a0"}</p>
                </div>
                <div className="form-group">
                    <label>repeat password</label>
                    <input value={this.state.password2} className="form-control" name="password2" type="password"
                           onChange={this.handleInput} disabled={this.props.loading}/>
                    <p className="formError">{'password2' in this.props.error ? this.props.error.password2 : "\u00a0"}</p>
                </div>
                <p className="formError">{'non_field_errors' in this.props.error ? this.props.error.non_field_errors : "\u00a0"}</p>
                <button type="submit" className="btn btn-secondary" style={{width: 100 + '%'}}
                        disabled={this.props.loading}>
                    register
                </button>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.auth.registerError,
        loading: state.auth.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (username, email, password1, password2) => dispatch(authRegister(username, email, password1, password2))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);