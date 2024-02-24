import { useContext } from 'react';
import UserAvatar from './UserAvatar';
import { UserContext } from '../../pages/Homepage';
import { Box, Button, Card, Typography } from '@mui/material';

export default function UserInfoSide() {
  const states = useContext(UserContext);
  //   console.log('User Info Side - user states:', states);
  return (
    <Card sx={{ minHeight: 500, mt: 5 }}>
      <UserAvatar name={states ? states.userID : 'no user info'} />
      <Box>
        <Typography>18</Typography>
        <Typography>Jobs Posted</Typography>
        <Typography>Review Score</Typography>
      </Box>
      <Box>
        <Typography>2</Typography>
        <Typography>Jobs Taken</Typography>
        <Typography>Review Score</Typography>
      </Box>
      <Button> Me Page</Button>
    </Card>
  );
}
