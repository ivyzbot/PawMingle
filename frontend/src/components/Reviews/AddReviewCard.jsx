import { useState } from 'react';
import { Box, Button, Modal, Rating, Typography } from '@mui/material';

export default function AddReviewCard({ open, setOpen }) {
  const [score, setScore] = useState(0);
  console.log(score);
  function handleClose() {
    setOpen(false);
  }
  function handleSubmit() {
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
