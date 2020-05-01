import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// MUI Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

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
    }
  });
  

export default function How(props) {
    
        dayjs.extend(relativeTime);
        const classes = useStyles();

        const { how : { body, createdAt, userImage, userHandle, howId, likeCount, commentCount } } = props
    
        return (
            <Card className={classes.root + " howCard"}>
                <CardMedia className={classes.media + " howCardImage"} image={userImage} title="Profile image" />
                <CardContent className={classes.content}>
                    <Typography gutterBottom
                     variant="h5" 
                     component={Link} 
                     to={`/users/${userHandle}`}
                     color="primary" className={classes.uHandle}>{userHandle + ' Asked'}</Typography>
                     <Typography
                     variant="body2">{dayjs(createdAt).fromNow()}</Typography>
                     <Typography
                     variant="body1">{body}</Typography>
                </CardContent>
            </Card>
        )

};
