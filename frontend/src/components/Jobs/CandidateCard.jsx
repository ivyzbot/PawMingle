/* eslint-disable react/prop-types */
import { Box, Button, Typography } from '@mui/material';

export default function CadidateCard({ name }) {
  function handleSelect() {}
  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        {name}
      </Typography>
      <Button
        color="primary"
        variant="outlined"
        size="small"
        onClick={handleSelect}
      >
        Select
      </Button>
    </Box>
  );
}
