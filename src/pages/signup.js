import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icons/icon.png';

// MUI components
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import CircularProgress from '@material-ui/core/CircularProgress';

// REDUX stuff
import { connect } from 'react-redux';
import {signupUser} from "../redux/actions/userActions";

const styles = {
    typography: {
        useNextVariants: true
    },
    pageTitle: {
        marginBottom: 20
    },
    inputs: {
        padding: '8px',
        boxSizing: 'border-box'
    },
    alert: {
        marginTop: 10,
        marginBottom: 15,
        fontSize: '.8em',
    },
    button: {
        position: 'relative'
    },
    progress: {
        position: 'absolute',
    }
};

export class signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
       this.props.signupUser(newUserData, this.props.history);
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {

        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;

        return (
            <div className="loginFormContainer">

                <img className="loginLogoImage" src={AppIcon} alt="Company Logo"/>
                <Typography variant="h3" className={classes.pageTitle}>
                    Create your account
                </Typography>
                <form className="loginForm" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <TextField
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        className={classes.inputs}
                        placeholder="Enter your email"
                        helperText={this.props.UI.errors && this.props.UI.errors.email ? this.props.UI.errors.email + "! Use your Singularity MDS email!" : "Use your Singularity MDS email!"}
                        error={this.props.UI.errors && this.props.UI.errors.email ? !!this.props.UI.errors.email : false}
                        value={this.state.email}
                        onChange={this.handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        className={classes.inputs}
                        placeholder="Enter your password"
                        helperText={this.props.UI.errors && this.props.UI.errors.password ? this.props.UI.errors.password + "! Use your Singularity MDS password!" : "Use your Singularity MDS password!"}
                        error={this.props.UI.errors && this.props.UI.errors.password ? !!this.props.UI.errors.password : false}
                        value={this.state.password}
                        onChange={this.handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        className={classes.inputs}
                        placeholder="Confirm your password"
                        helperText={ errors.confirmPassword ? errors.confirmPassword : "Use your Singularity MDS password!"}
                        error={!!errors.confirmPassword}
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        id="handle"
                        name="handle"
                        type="text"
                        label="Handle"
                        className={classes.inputs}
                        placeholder="Enter your Handle"
                        helperText={ errors.handle ? errors.handle : "Use your Singularity MDS password!"}
                        error={!!errors.handle}
                        value={this.state.handle}
                        onChange={this.handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    {errors.general && (
                        <Typography variant="body2" className={classes.alert}>
                            Wrong Email or Password
                        </Typography>
                    )}
                    <Button
                        className={classes.button + " loginButton"}
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmit}
                        disabled={loading}
                    >
                        <LockOpenIcon /> &nbsp; &nbsp;Signup
                        {loading && (
                            <CircularProgress className={classes.progress} />
                        )}
                    </Button>
                    <p>Use your Singularity MDS login info</p>
                </form>
            </div>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
};

const mapStateToProps = ( state ) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    signupUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(signup));
