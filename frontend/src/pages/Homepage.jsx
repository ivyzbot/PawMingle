import { createContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { getTokenDetails } from '../utilities/helperFuncs.js';
import NavBar from '../components/Layout/NavBar';
import Grid from '@mui/material/Unstable_Grid2';

export const UserContext = createContext({
  name: null,
  email: null,
  isAdmin: false,
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
        <Grid container spacing={2} xs={12}>
          <Grid xs={2}>
            <div style={{ backgroundColor: 'red' }}>User Info</div>
          </Grid>
          <Grid xs={8}>
            <div>
              {' '}
              <Outlet />
            </div>
          </Grid>
          <Grid xs={2}>
            <div style={{ backgroundColor: 'red' }}>Pending</div>
          </Grid>
        </Grid>
      </UserContext.Provider>
    </>
  );
}
