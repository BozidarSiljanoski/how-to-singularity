import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icons/icon.png';
import axios from 'axios';

// MUI components
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import CircularProgress from '@material-ui/core/CircularProgress';

//REDUX stuff
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions';


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

export class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {

        const {classes, UI: {loading}} = this.props;
        const {errors} = this.state;

        return (
            <div className="loginFormContainer">

                <img className="loginLogoImage" src={AppIcon} alt="Company Logo"/>
                <Typography variant="h3" className={classes.pageTitle}>
                    Please Login
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
                        error={!! this.props.UI.errors && this.props.UI.errors.email}
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
                        <LockOpenIcon/> &nbsp; &nbsp;Login
                        {loading && (
                            <CircularProgress className={classes.progress}/>
                        )}
                    </Button>
                    <p>Use your Singularity MDS login info</p>
                </form>
            </div>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
