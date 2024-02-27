import { createContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { getTokenDetails } from '../utilities/helperFuncs.js';
import NavBar from '../components/Layout/NavBar';
import UserInfoSide from '../components/User/UserInfoSide.jsx';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';

export const UserContext = createContext({
  name: null,
  email: null,
  isAdmin: false,
  userID: null,
});

export default function Homepage() {
  const tokenDetails = getTokenDetails();
  // console.log('Token Details: ', tokenDetails);
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenDetails || !tokenDetails.name) {
      navigate('/');
    }
  });

  return (
    <>
      <UserContext.Provider value={tokenDetails}>
        <NavBar />
        <Grid container spacing={2} sx={{ backgroundColor: 'grey.secondary' }}>
          <Grid item xs>
            <UserInfoSide />
          </Grid>
          <Grid item xs={6}>
            <Outlet />
          </Grid>
          <Grid item xs>
            <Box>Pending</Box>
          </Grid>
        </Grid>
      </UserContext.Provider>
    </>
  );
}
