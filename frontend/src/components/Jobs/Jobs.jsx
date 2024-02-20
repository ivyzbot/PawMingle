import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../pages/Homepage';
import { Box, Button } from '@mui/material';

export default function Jobs() {
  // const states = useContext(UserContext);
  // console.log('UserContext:', states);
  const navigate = useNavigate();
  function handleClick() {
    navigate('new');
  }
  return (
    <Box sx={{ mt: 2 }}>
      <Button variant="contained" color="green" onClick={handleClick}>
        Create Job
      </Button>
      <div>Jobs</div>
    </Box>
  );
}
