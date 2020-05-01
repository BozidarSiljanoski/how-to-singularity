import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import {ThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
// Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from "./redux/types";
import { logOutUser, getUserData } from "./redux/actions/userActions";

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';

// Utilities
import {theTheme} from './util/theme';

const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        window.location.href = '/login';
        store.dispatch(logOutUser());
    } else {
        store.dispatch({ type:SET_AUTHENTICATED });
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
    }
}

export const theme = createMuiTheme(theTheme);

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <div className="App">
                        <Router>
                            <Navbar/>
                            <div className="container">
                                <Switch>
                                    <Route exact path="/" component={home}/>
                                    <AuthRoute
                                        exact
                                        path="/login"
                                        component={login}
                                        props={theme}
                                    />
                                    <AuthRoute
                                        exact
                                        path="/signup"
                                        component={signup}
                                    />
                                    <Route exact path="/users/:handle" component={user} />
                                </Switch>
                            </div>
                        </Router>
                    </div>
                </Provider>
            </ThemeProvider>
        );
    }
}

export default App;
