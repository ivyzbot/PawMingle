import { useContext } from 'react';
import { useLocation } from 'react-router';
import moment from 'moment';
import PosterButtons from './PosterButtons';
import { UserContext } from '../../pages/Homepage';
import { useGetOneJobQuery } from '../../hooks/jobHook';
import {
  CardHeader,
  Typography,
  CardContent,
  Card,
  CardActions,
  Avatar,
  Box,
} from '@mui/material';

export default function JobDetailsCard() {
  const states = useContext(UserContext);
  // console.log('States: ', states);
  // {name: 'ivy2', email: 'ivy2@pawmingle.com', is_admin: false, userID: '65d0d2a05664790bf8762f92'}
  const { state } = useLocation();
  const { data: jobDataRaw, isLoading, error } = useGetOneJobQuery(state.jobID);
  const jobData = jobDataRaw.data;
  console.log('Job Data:', jobData);

  return (
    <>
      {isLoading ? (
        <Box>Loading</Box>
      ) : error ? (
        <Box>Error</Box>
      ) : (
        <Card variant="outlined" sx={{ minWidth: 120, mt: 5 }}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe">{jobData.posterID.name[0]}</Avatar>
            }
            title="You are looking for"
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
              {`End Time: ${moment(jobData.endTime).format(
                'YYYY-MM-D, h:mm a'
              )}`}
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
            <PosterButtons />
          </CardActions>
        </Card>
      )}
    </>
  );
}
