/* eslint-disable react/prop-types */
import { useContext } from 'react';
import moment from 'moment';
import ViewerButtons from './ViewerButtons';
import PosterButtons from './PosterButtons';
import UserAvatar from '../User/UserAvatar';
import { UserContext } from '../../pages/Homepage';
import {
  CardHeader,
  Typography,
  CardContent,
  Card,
  CardActions,
  // Avatar,
} from '@mui/material';

export default function JobCard({ jobData }) {
  const states = useContext(UserContext);
  // console.log('States: ', states);
  // console.log('Job Data: ', jobData);
  // {name: 'ivy2', email: 'ivy2@pawmingle.com', is_admin: false, userID: '65d0d2a05664790bf8762f92'}
  const isInCandidate = jobData.candidates.includes(states.userID);
  const isSelected = jobData.selected === states.userID;
  return (
    <Card variant="outlined" sx={{ minWidth: 120, mt: 5 }}>
      <CardHeader
        avatar={<UserAvatar name={jobData.posterID._id} />}
        // avatar={<Avatar aria-label="recipe">{jobData.posterID.name[0]}</Avatar>}
        title={`${jobData.posterID.name} is looking for`}
        subheader={`Posted at ${jobData.createdAt}`}
      />
      <CardContent>
        <Typography
          component="div"
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
        >
          {`Job Type: ${jobData.jobType}`}
        </Typography>
        <Typography
          component="div"
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
        >
          {`Pet Type: ${jobData.petType}`}
        </Typography>
        <Typography
          component="div"
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
        >
          {`Start Time: ${moment(jobData.startTime).format(
            'YYYY-MM-D, h:mm a'
          )}`}
        </Typography>
        <Typography
          component="div"
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
        >
          {`End Time: ${moment(jobData.endTime).format('YYYY-MM-D, h:mm a')}`}
        </Typography>
        <Typography
          component="div"
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
        >
          {`Location: ${jobData.location}`}
        </Typography>
        <Typography
          component="div"
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
        >
          {`Price: $${jobData.price}`}
        </Typography>
        <Typography
          component="div"
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
        >
          {`Job Status: ${jobData.jobStatus}`}
        </Typography>
        <Typography
          component="div"
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
        >
          {`Description: ${jobData.description}`}
        </Typography>
      </CardContent>
      <CardActions>
        {states.userID === jobData.posterID._id ? (
          <PosterButtons jobID={jobData._id} />
        ) : (
          <ViewerButtons
            isInCandidate={isInCandidate}
            jobStatus={jobData.jobStatus}
            isSelected={isSelected}
            jobID={jobData._id}
          />
        )}
      </CardActions>
    </Card>
  );
}
