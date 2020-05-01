// import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import dayjs from 'dayjs';
// import { Link } from 'react-router-dom';
//
// // MUI SHET
// import withStyles from '@material-ui/core/styles/withStyles';
// import MuiLink from '@material-ui/core/Link';
// import Typography from '@material-ui/core/Typography';
//   // MUI Icons
//   import LocationOn from '@material-ui/icons/LocationOn';
//   import LinkIcon from '@material-ui/icons/Link';
//   import CalendarToday from '@material-ui/icons/CalendarToday';
// import Paper from "@material-ui/core/Paper";
//
// const styles = (theme) => ({
//   paper: {
//     padding: 20
//   },
//   profile: {
//     '& .image-wrapper': {
//       textAlign: 'center',
//       position: 'relative',
//     },
//     '& .profile-image': {
//       width: 200,
//       height: 200,
//       objectFit: 'cover',
//       maxWidth: '100%',
//       borderRadius: '50%',
//       margin: ' 0 auto'
//     },
//     '& .profile-details': {
//       textAlign: 'center',
//       '& span, svg': {
//         verticalAlign: 'middle'
//       },
//       '& a': {
//         color: theme.palette.primary.main
//       }
//     },
//     '& hr': {
//       border: 'none',
//       margin: '0 0 10px 0'
//     },
//   }
// });
//
// const StaticProfile = (props) => {
//   const { classes, profile: { handle, createdAt, imageUrl, bio, website, location}} = props;
//
//   return (
//     <Paper className={classes.paper}>
//       <div className={classes.profile}>
//         <div className="profile-image">
//           <img className="profile-image" src={imageUrl} alt="profile"/>
//         </div>
//         <hr/>
//         <div className="profile-details">
//           <MuiLink component={Link} to={`/users/${handle}`} colo="primary" variant="h5">
//             @{handle}
//           </MuiLink>
//           <hr/>
//           {bio && <Typography variant="body2">{bio}</Typography>}
//           <hr/>
//           {location && (
//             <Fragment>
//               <LocationOn color="primary"/>
//               <span>{location}</span>
//             </Fragment>
//           )}
//           <hr/>
//           {website && (
//             <Fragment>
//               <LinkIcon color="primary"/>
//               <a href={website} target="_blank" rel="noopener noreferrer">
//                 {' '}{website}
//               </a>
//               <hr/>
//             </Fragment>
//           )}
//           <CalendarToday color="primary"/>{' '}
//           <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
//         </div>
//       </div>
//     </Paper>
//   )
// };
//
// StaticProfile.propTypes = {
//   profile: PropTypes.object.isRequired,
//   classes: PropTypes.object.isRequired
// }
//
// export default withStyles(styles)(StaticProfile);