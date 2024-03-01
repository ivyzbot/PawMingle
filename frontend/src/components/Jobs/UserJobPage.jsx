import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../pages/Homepage';
import UserJobCard from './UserJobCard';
import { useGetUserJobQuery } from '../../hooks/jobHook';
import { Box, Grid, Typography } from '@mui/material';

export default function UserJobPage() {
  const states = useContext(UserContext);
  const {
    data: userJobData,
    isLoading: isUserJobLoading,
    error: isUserJobError,
    refetch: userJobRefetch,
  } = useGetUserJobQuery(states ? states.userID : null);
  const [refresh, setRefresh] = useState(false);

  //   console.log(userJobData);
  useEffect(() => {
    userJobRefetch();
  }, [refresh]);

  return (
    <>
      {isUserJobLoading ? (
        <Typography>Loading</Typography>
      ) : isUserJobError ? (
        <Typography>{isUserJobError}</Typography>
      ) : (
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          mt={2}
        >
          {userJobData.data.postJobs.map((jobData) => (
            <Grid key={jobData._id} item xs={12}>
              <UserJobCard
                jobData={jobData}
                jobType="postJobs"
                setRefresh={setRefresh}
                refresh={refresh}
              />
            </Grid>
          ))}
          {userJobData.data.doneJobs.map((jobData) => (
            <Grid key={jobData._id} item xs={12}>
              <UserJobCard
                key={jobData._id}
                jobData={jobData}
                jobType="doneJobs"
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
