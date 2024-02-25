import { useContext } from 'react';
import { UserContext } from '../../pages/Homepage';
import UserJobCard from './UserJobCard';
import { useGetUserJobQuery } from '../../hooks/jobHook';
import { Box, Typography } from '@mui/material';

export default function UserJobPage() {
  const states = useContext(UserContext);
  const {
    data: userJobData,
    isLoading: isUserJobLoading,
    error: isUserJobError,
  } = useGetUserJobQuery(states ? states.userID : null);

  //   console.log(userJobData);

  return (
    <>
      {isUserJobLoading ? (
        <Typography>Loading</Typography>
      ) : isUserJobError ? (
        <Typography>{isUserJobError}</Typography>
      ) : (
        <Box>
          {userJobData.data.postJobs.map((jobData) => (
            <UserJobCard
              key={jobData._id}
              jobData={jobData}
              jobType="postJobs"
            />
          ))}
          {userJobData.data.doneJobs.map((jobData) => (
            <UserJobCard
              key={jobData._id}
              jobData={jobData}
              jobType="doneJobs"
            />
          ))}
        </Box>
      )}
    </>
  );
}
