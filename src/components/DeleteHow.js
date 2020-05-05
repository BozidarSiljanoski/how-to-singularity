import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import MyconButton from "../util/MyconButton";
import withStyles from '@material-ui/core/styles/withStyles';

// MUI stuff
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// Redux stuff
import {connect} from 'react-redux';
import {deleteHow} from '../redux/actions/dataActions';
import {theme} from "../App";

const styles = (theme) => ({
  deleteButton: {
    position: 'absolute',
    right: 10,
    top: 10
  }
});

class DeleteHow extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({open: true});
  };
  handleClose = () => {
    this.setState({open: false});
  };
  deleteHow = () => {
    this.props.deleteHow(this.props.howId);
    this.setState({open: false});
  };

  render() {
    const {classes} = this.props;
    return (
      <Fragment>
        <MyconButton tip="Delete How"
                     onClick={this.handleOpen}
                     btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="error"/>
        </MyconButton>
        <Dialog open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm">
          <DialogTitle>Are you sure you want to delete this how?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteHow} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

      </Fragment>
    );
  }
}

DeleteHow.propTypes = {
  deleteHow: PropTypes.func.isRequired,
  howId: PropTypes.string.isRequired
};

export default connect(null, {deleteHow})(withStyles(styles)(DeleteHow));