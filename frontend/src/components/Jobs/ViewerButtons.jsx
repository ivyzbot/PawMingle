/* eslint-disable react/prop-types */
import { useUpdateJobMutation } from '../../hooks/jobHook';
import { useContext, useState } from 'react';
import { UserContext } from '../../pages/Homepage';
import { Box, Button } from '@mui/material';

export default function ViewerButtons({
  jobStatus,
  isInCandidate,
  isSelected,
  jobID,
}) {
  const states = useContext(UserContext);
  const { mutateAsync: updateJob } = useUpdateJobMutation();
  const [buttonStatus, setButtonStatus] = useState(isInCandidate);

  async function handleClick() {
    let updateJobBody = {
      candidates: states.userID,
    };

    const updatedJob = await updateJob({
      jobID: jobID,
      body: updateJobBody,
    });
    console.log('Updated Job:', updatedJob);
    const isInCandidateNew = updatedJob.data.candidates.includes(states.userID);
    setButtonStatus(isInCandidateNew);
  }

  function elementsToRender() {
    if (jobStatus === 'Pending') {
      return (
        <>
          <Button color="primary" variant="outlined" size="small">
            Message
          </Button>
          <Button
            color="primary"
            variant="contained"
            size="small"
            disabled={buttonStatus}
            onClick={handleClick}
          >
            I'm Interested
          </Button>
        </>
      );
    } else if (isSelected) {
      return (
        <>
          <Button color="primary" variant="outlined" size="small">
            Message
          </Button>
        </>
      );
    }
  }
  return <Box>{elementsToRender()}</Box>;
}
