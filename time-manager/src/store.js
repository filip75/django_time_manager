import {applyMiddleware, combineReducers, createStore} from 'redux';
import projects from "./reducers/projectsReducers";
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {auth} from "./reducers/auth";
import {checkAuth} from "./actions/auth";


const loggerMiddleware = createLogger();
const store = createStore(
    combineReducers(
        {projects, auth}),
    {},
    applyMiddleware(thunkMiddleware, loggerMiddleware)
);

// store.dispatch(shouldFetch(1));
store.dispatch(checkAuth());
export default store;