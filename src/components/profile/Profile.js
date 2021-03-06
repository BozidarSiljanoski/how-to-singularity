import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import './styls.css';

// Redux
import {connect} from 'react-redux';
import {logOutUser, uploadImage} from "../../redux/actions/userActions";

// MUI Stuff
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// MUI ICONS
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

import MyconButton from "../../util/MyconButton";

const styles = (theme) => ({
  paper: {
    padding: 20,
    position: 'relative'
  },
  profile: {
    '& .button': {
      boxShadow: '1px 1px 6px rgba(0,0,0,.275)',
    },
    '& .logoutButton': {
      display: 'block',
    },
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%',
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
      margin: ' 0 auto'
    },
    '& .profile-details': {
      marginTop: 12,
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: theme.palette.primary.main
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
});

class Profile extends Component {
  constructor(props) {
    super(props);

    this.imageInputRef = React.createRef();
    this.handleEditPicture = this.handleEditPicture.bind(this);
  }

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
    // send to server

  };
  handleEditPicture = () => {
    const fileInput = this.imageInputRef.current;
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logOutUser();
  };


  render() {
    const {
      classes,
      user: {
        credentials: {
          handle,
          createdAt,
          imageUrl,
          bio,
          website,
          location
        },
        loading,
        authenticated
      }
    } = this.props;

    let profileMarkup = !loading ? (authenticated ? (
      <Paper className={classes.paper + ' profile-info-container'}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img className="profile-image" src={imageUrl} alt="profile"/>
            <input type="file"
                   id="imageInput"
                   hidden="hidden"
                   onChange={this.handleImageChange}
                   ref={this.imageInputRef}
            />
            <MyconButton tip="Change your Image" btnClassName="button" onClick={this.handleEditPicture}>
              <EditIcon color="primary"/>
            </MyconButton>
          </div>
          <div className="profile-details">
            <MuiLink component={Link} to={`/users/${handle}`} colo="primary" variant="h5">
              @{handle}
            </MuiLink>
            <hr/>
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr/>
            {location && (
              <Fragment>
                <LocationOn color="primary"/>
                <span>{location}</span>
              </Fragment>
            )}
            <hr/>
            {website && (
              <Fragment>
                <LinkIcon color="primary"/>
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {' '}{website}
                </a>
                <hr/>
              </Fragment>
            )}
            <CalendarToday color="primary"/>{' '}
            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>
          <MyconButton tip="Logout" onClick={() => this.handleLogout()} btnClassName="button logoutButton">
            <KeyboardReturn color="primary"/>
          </MyconButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button variant="contained" color="primary" component={Link} to="/login">
            Login
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/signup">
            Signup
          </Button>
        </div>
      </Paper>
    )) : (<p>loading...</p>);

    return profileMarkup;
  }
}

Profile.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired

};

const mapActionsToProps = {logOutUser, uploadImage};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));