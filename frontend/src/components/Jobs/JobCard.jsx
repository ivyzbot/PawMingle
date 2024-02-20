/* eslint-disable react/prop-types */
import { useContext } from 'react';
import moment from 'moment';
import ViewerButtons from './ViewerButtons';
import PosterButtons from './PosterButtons';
import { UserContext } from '../../pages/Homepage';
import {
  CardHeader,
  Typography,
  CardContent,
  Card,
  CardActions,
  Avatar,
  IconButton,
} from '@mui/material';

export default function JobCard({ jobData }) {
  const states = useContext(UserContext);
  // console.log('States: ', states);
  return (
    <Card variant="outlined" sx={{ minWidth: 120, mt: 5 }}>
      <CardHeader
        avatar={<Avatar aria-label="recipe">{jobData.posterID.name[0]}</Avatar>}
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
          {`Job Status: $${jobData.jobStatus}`}
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
          <PosterButtons />
        ) : (
          <ViewerButtons />
        )}
      </CardActions>
    </Card>
  );
}
