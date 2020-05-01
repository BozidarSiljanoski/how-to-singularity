import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';

// Components
import How from '../components/How';
import Profile from '../components/Profile';

export class home extends Component {

  state = {
    hows: null
  }

  componentDidMount() {
    // fetch('/hows')
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((data) => {
    //         this.setState({
    //           hows: data
    //         });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    Axios.get('/hows')
      .then((res) => {
        this.setState({
          hows: res.data
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {

    let recentHowsMarkup = this.state.hows ? (
      this.state.hows.map((value, key) => <How key={key} how={value}/>)
    ) : 'Loading...';

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

export default home
