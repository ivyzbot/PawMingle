import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../pages/Homepage';
import JobCard from './JobCard';

import { useGetJobsQuery } from '../../hooks/jobHook';
import { Box, Button } from '@mui/material';

export default function Jobs() {
  // const states = useContext(UserContext);
  // console.log('UserContext:', states);
  const { data: jobsData, isLoading, error } = useGetJobsQuery();
  // console.log('Jobs Data: ', jobsData);
  const navigate = useNavigate();
  function handleClick() {
    navigate('new');
  }
  return (
    <Box sx={{ mt: 2 }}>
      <Button variant="contained" color="green" onClick={handleClick}>
        Create Job
      </Button>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading jobs</div>
      ) : (
        <>
          {' '}
          {jobsData.data.map((jobsData) => (
            <JobCard key={jobsData._id} jobData={jobsData} />
          ))}
        </>
      )}
    </Box>
  );
}
