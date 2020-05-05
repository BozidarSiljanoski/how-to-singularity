import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyconButton from "../util/MyconButton";
import DeleteHow from "./DeleteHow";

// REDUX STUFF
import {connect} from 'react-redux';
import {likeHow, unlikeHow} from '../redux/actions/dataActions';

// MUI Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

//Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';



const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: '100%',
  },
  content: {
    flexGrow: 1,
    padding: 25,
  },
  button: {
    marginLeft: 12,
    marginRight: 2
  }
});


 const How = (props) => {
  const likedHow = () => {
    if (props.user.likes && props.user.likes.find(like => like.howId === props.how.howId))
      return true;
    else return false
  };
  const likeHow = () => {
    props.likeHow(props.how.howId)
  };
  const unlikeHow = () => {
    props.unlikeHow(props.how.howId)
  };
  dayjs.extend(relativeTime);
  const classes = useStyles();

  const {how: {body, createdAt, userImage, userHandle, howId, likeCount, commentCount}, user: { authenticated, credentials: { handle } }} = props;

  const likeButton = (!authenticated) ? (
    <MyconButton tip="Like">
      <Link to="/login">
        <FavoriteBorderIcon color="primary" />
      </Link>
    </MyconButton>
  ) : (
    likedHow() ? (
      <MyconButton tip="Undo Like" onClick={unlikeHow}>
          <FavoriteIcon color="primary" />
      </MyconButton>
    ) : (
      <MyconButton tip=" Like" onClick={likeHow}>
          <FavoriteBorderIcon color="primary" />
      </MyconButton>
    )
  );

  const deleteButton = authenticated && userHandle === handle ? (
    <DeleteHow howId={howId} />
  ) : null;

  return (
    <Card className={classes.root + " howCard"}>
      <CardMedia className={classes.media + " howCardImage"} image={userImage} title="Profile image"/>
      <CardContent className={classes.content}>
        <Typography gutterBottom
                    variant="h5"
                    component={Link}
                    to={`/users/${userHandle}`}
                    color="primary" className={classes.uHandle}>
          {userHandle + ' Asked'}
        </Typography>
        {deleteButton}
        <Typography
          variant="body2">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography
          variant="body1">
          {body}
        </Typography>
        {likeButton}
        <span>{likeCount} Likes</span>
        <MyconButton tip="Comments" btnClassName={classes.button}>
          <ChatIcon color="primary"/>
        </MyconButton>
        <span>{commentCount} Comments</span>
      </CardContent>
    </Card>
  )
};

How.propTypes = {
  likeHow: PropTypes.func.isRequired,
  unlikeHow: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  how: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeHow,
  unlikeHow
};

export default connect(mapStateToProps, mapActionsToProps)(How);
