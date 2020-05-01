import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import How from '../components/How'
import StaticProfile from '../components/profile/StaticProfile'
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions'

class user extends Component {
  state = {
    profile: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    this.props.getUserData(handle);
    axios.get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        })
      })
      .catch(err => console.log(err));
  }
  render() {
    const { hows, loading } = this.props.data;

    const howsMarkup = loading ? (
      <p>Loading data...</p>
    ) : hows === null ? (
      <p>No hows from this user</p>
    ) : (
      hows.map(how => <How key={how.howId} how={how} />)
    )

    return (
      <Grid container spacing={2}>
        <Grid className="howCardContainer" item sm={8} xs={12}>
          {howsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <StaticProfile profile={this.state.profile}/>
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, {getUserData})(user);