import React from "react";
import {Redirect, Route} from "react-router";

export const AuthRequiredRoute = ({component: Component, isAuthenticated, ...others}) => (
    <Route {...others} render={props => (
        isAuthenticated ?
            <Component {...props}/>
            :
            <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
    )}/>
);

export const AuthForbiddenRoute = ({component: Component, isAuthenticated, ...others}) => (
    <Route {...others} render={props => (
        !isAuthenticated ?
            <Component {...props}/>
            :
            <Redirect to='/'/>
    )}/>
);