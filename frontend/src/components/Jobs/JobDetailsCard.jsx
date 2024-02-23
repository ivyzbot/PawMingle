import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
// import { useLocation } from 'react-router';
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
import CadidateCard from './CandidateCard';
import apiClient from '../../apiClient/apiClient';

export default function JobDetailsCard() {
  const states = useContext(UserContext);
  //   console.log('States: ', states);
  // {name: 'ivy2', email: 'ivy2@pawmingle.com', is_admin: false, userID: '65d0d2a05664790bf8762f92'}
  const params = useParams();
  const { jobid } = params;
  // const {
  //   data: jobDataRaw,
  //   isLoading,
  //   error,
  // } = useGetOneJobQuery(jobid);
  let isLoading = false;
  let error = null;
  const [jobData, setJobData] = useState();
  const [selected, setSelected] = useState(jobData ? jobData.selected : null);
  const [jobStatus, setJobStatus] = useState(
    jobData ? jobData.jobStatus : 'Pending'
  );

  async function useGetOneJobQuery(jobID, setFn) {
    const jobDataRaw = (await apiClient.get(`jobs/getone/${jobID}`)).data;
    setFn(jobDataRaw.data);
  }

  useEffect(() => {
    useGetOneJobQuery(jobid, setJobData);
  }, [jobid]);

  // console.log('Job Data:', jobData);

  return (
    <>
      {!jobData ? (
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
            <Typography
              component="div"
              variant="subtitle1"
              color="text.secondary"
              gutterBottom
            >
              Candidates:
            </Typography>
            {jobData.candidates.map((candidate) => (
              <CadidateCard
                name={candidate.name}
                key={candidate._id}
                candidateid={candidate._id}
                jobid={jobid}
                jobData={jobData}
                setJobData={setJobData}
              />
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}
