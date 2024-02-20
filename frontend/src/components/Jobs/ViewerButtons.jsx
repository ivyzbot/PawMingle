import { Box, Button } from '@mui/material';

export default function ViewerButtons() {
  return (
    <Box>
      <Button color="primary" variant="outlined" size="small">
        Message
      </Button>
      <Button color="primary" variant="contained" size="small">
        I'm Interested
      </Button>
    </Box>
  );
}
