import { useContext } from 'react';
import { UserContext } from '../../pages/Homepage';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import UserAvatar from '../User/UserAvatar';
import moment from 'moment';
import CadidateCard from './CandidateCard';
import ViewerButtons from './ViewerButtons';
import { useState } from 'react';

export default function UserJobCard({ jobData, jobType }) {
  const states = useContext(UserContext);
  const [jobDataDynamic, setJobDataDynamic] = useState(jobData);
  const isInCandidate = jobData.candidates.includes(states.userID);
  const isSelected = jobData.selected === states.userID;
  return (
    <>
      <Card variant="outlined" sx={{ minWidth: 120, mt: 5 }}>
        <CardHeader
          avatar={<UserAvatar name={jobData.posterID._id} />}
          title={
            jobType === 'doneJobs'
              ? `${jobData.posterID.name} is looking for`
              : 'You are looking for'
          }
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
            {`Job Status: ${jobDataDynamic.jobStatus}`}
          </Typography>
          <Typography
            component="div"
            variant="subtitle1"
            color="text.secondary"
            gutterBottom
          >
            {`Description: ${jobData.description}`}
          </Typography>
          {jobType === 'postJobs' ? (
            <>
              {' '}
              <Typography
                component="div"
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
              >
                Candidates:
              </Typography>
              {jobDataDynamic.candidates.map((candidate) => (
                <CadidateCard
                  name={candidate.name}
                  key={candidate._id}
                  candidateid={candidate._id}
                  jobid={jobData._id}
                  jobData={jobDataDynamic}
                  setJobData={setJobDataDynamic}
                />
              ))}
            </>
          ) : (
            <ViewerButtons
              isInCandidate={isInCandidate}
              jobStatus={jobData.jobStatus}
              isSelected={isSelected}
              jobID={jobData._id}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
}
