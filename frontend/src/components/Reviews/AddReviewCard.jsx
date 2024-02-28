import { useState } from 'react';
import { useCreateReviewMutation } from '../../hooks/reviewHooks';
import { useUpdateJobMutation } from '../../hooks/jobHook';
import { Box, Button, Grid, Modal, Rating, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

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
          boxShadow: 0,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'grey.main',
          borderRadius: 5,
          p: 4,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          mt={1}
          mb={2}
          ml={3}
        >
          How do you feel about the user?
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          columnSpacing={4}
        >
          <Grid item sx={6}>
            <Rating
              name="simple-controlled"
              value={score}
              onChange={(evt, newScore) => {
                setScore(newScore);
              }}
            />
          </Grid>
          <Grid item sx={6}>
            <Button onClick={handleSubmit} endIcon={<SendIcon />}>
              Submit Review
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
