import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import MyconButton from "../util/MyconButton";

/*REDUX STUFF*/
import {connect} from 'react-redux';

// MUI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//Icons
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

export class Navbar extends Component {
  render() {
    const {authenticated} = this.props;

    return (
      <AppBar>
        <Toolbar className={"nav-container"}>
          {authenticated ? (
            <Fragment>
              <MyconButton
                tip="Ask How">
                <AddIcon/>
              </MyconButton>
              <Link to="/">
                <MyconButton
                  tip="Home">
                  <HomeIcon/>
                </MyconButton>
              </Link>
              <MyconButton
                tip="Notifications">
                <Notifications/>
              </MyconButton>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <div className="grow"></div>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/signup">Signup</Button>
            </Fragment>
          )}

        </Toolbar>
      </AppBar>
    )
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});


export default connect(mapStateToProps)(Navbar);
