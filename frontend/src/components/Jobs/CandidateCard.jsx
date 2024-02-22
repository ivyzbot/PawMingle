import { useState } from 'react';
import { useUpdateJobMutation } from '../../hooks/jobHook';
import { Box, Button, Typography } from '@mui/material';

export default function CadidateCard({
  name,
  jobid,
  candidateid,
  selected,
  setSelected,
}) {
  // console.log('selected:', selected);
  const { mutateAsync: updateJob } = useUpdateJobMutation();
  const [disabled, setDisabled] = useState(false);
  // const buttonInitialStatus =
  const [isCandidate, setIsCandidate] = useState(candidateid === selected);

  async function handleSelect() {
    const updateJobBody = { selected: candidateid };
    const updatedJob = await updateJob({
      jobID: jobid,
      body: updateJobBody,
    });
    setSelected(true);
    if (candidateid === updatedJob.data.selected) {
      setIsCandidate(true);
    }
  }

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        {name}
      </Typography>
      {!selected ? (
        <Button
          color="primary"
          variant="outlined"
          size="small"
          onClick={handleSelect}
        >
          Select
        </Button>
      ) : isCandidate ? (
        <Button
          color="primary"
          variant="outlined"
          size="small"
          onClick={() => {}}
        >
          Job Completed
        </Button>
      ) : (
        <Button color="primary" variant="outlined" size="small" disabled>
          Select
        </Button>
      )}
    </Box>
  );
}
