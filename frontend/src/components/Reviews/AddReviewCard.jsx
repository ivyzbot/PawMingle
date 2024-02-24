import { useState } from 'react';
import { useCreateReviewMutation } from '../../hooks/reviewHooks';
import { useUpdateJobMutation } from '../../hooks/jobHook';
import { Box, Button, Modal, Rating, Typography } from '@mui/material';

export default function AddReviewCard({ open, setOpen, jobData, setJobData }) {
  const [score, setScore] = useState(0);
  const { mutateAsync: postReview } = useCreateReviewMutation();
  const { mutateAsync: updateJob } = useUpdateJobMutation();
  //   console.log(jobData);
  function handleClose() {
    setOpen(false);
  }
  async function handleSubmit() {
    const reviewBody = {};
    reviewBody.receiverID = jobData.selected;
    reviewBody.reviewType = 'Provider';
    reviewBody.giverID = jobData.posterID._id;
    reviewBody.jobID = jobData._id;
    reviewBody.score = score;
    const jobBody = { jobStatus: 'Reviewed' };
    await postReview(reviewBody);
    const updatedJob = await updateJob({
      jobID: jobData._id,
      body: jobBody,
    });
    setJobData({ ...jobData, jobStatus: 'Reviewed' });
    setOpen(false);
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          How do you feel about the user?
        </Typography>
        <Rating
          name="simple-controlled"
          value={score}
          onChange={(evt, newScore) => {
            setScore(newScore);
          }}
        />
        <Button onClick={handleSubmit}>Submit Review</Button>
      </Box>
    </Modal>
  );
}
