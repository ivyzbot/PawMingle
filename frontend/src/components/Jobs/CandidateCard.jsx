import { useState } from 'react';
import { useUpdateJobMutation } from '../../hooks/jobHook';
import { Box, Button, Typography } from '@mui/material';

export default function CadidateCard({
  name,
  jobid,
  candidateid,
  jobData,
  setJobData,
}) {
  // console.log('selected:', selected);
  const { mutateAsync: updateJob } = useUpdateJobMutation();
  // const buttonInitialStatus =
  const [isCandidate, setIsCandidate] = useState(
    candidateid === jobData.selected
  );

  async function handleSelect() {
    const updateJobBody = { selected: candidateid, jobStatus: 'Taken' };
    const updatedJob = await updateJob({
      jobID: jobid,
      body: updateJobBody,
    });
    setJobData({
      ...jobData,
      selected: updatedJob.data.selected,
      jobStatus: 'Taken',
    });
    if (candidateid === updatedJob.data.selected) {
      setIsCandidate(true);
    }
  }

  async function handleComplete() {
    const updateJobBody = { jobStatus: 'Completed' };
    const updatedJob = await updateJob({
      jobID: jobid,
      body: updateJobBody,
    });
    setJobData({ ...jobData, jobStatus: 'Completed' });
  }

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        {name}
      </Typography>
      {!jobData.selected ? (
        <Button
          color="primary"
          variant="outlined"
          size="small"
          onClick={handleSelect}
        >
          Select
        </Button>
      ) : isCandidate && jobData.jobStatus !== 'Completed' ? (
        <Button
          color="primary"
          variant="outlined"
          size="small"
          onClick={handleComplete}
        >
          Job Completed
        </Button>
      ) : isCandidate && jobData.jobStatus === 'Completed' ? (
        <Button
          color="primary"
          variant="outlined"
          size="small"
          onClick={() => {}}
        >
          Review
        </Button>
      ) : (
        <Button color="primary" variant="outlined" size="small" disabled>
          Select
        </Button>
      )}
    </Box>
  );
}
