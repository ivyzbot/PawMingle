import { useContext } from 'react';
import { UserContext } from '../../pages/Homepage';
import { Box, Button } from '@mui/material';

export default function Jobs() {
  const states = useContext(UserContext);
  // console.log('UserContext:', states);
  return (
    <Box sx={{ mt: 2 }}>
      <Button variant="contained" color="green">
        Create Job
      </Button>
      <div>Jobs</div>
    </Box>
  );
}
