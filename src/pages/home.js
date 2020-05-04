import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import PropTypes from 'prop-types';

// Components
import How from '../components/How';
import Profile from '../components/profile/Profile';

import { connect } from 'react-redux';
import { getHows } from '../redux/actions/dataActions';

export class home extends Component {

  state = {
    hows: null
  };

  componentDidMount() {
   this.props.getHows();
  }

  render() {

    const { hows, loading } = this.props.data;

    let recentHowsMarkup = !loading ?
     hows.map((value, key) => <How key={key} how={value}/>)
     : 'Loading...';

    return (
      <Grid container spacing={2}>
        <Grid className="howCardContainer" item sm={8} xs={12}>
          {recentHowsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile/>
        </Grid>
      </Grid>
    )
  }
}

home.propTypes = {
  getHows: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, {getHows} )(home)
