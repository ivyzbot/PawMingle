import { Outlet } from 'react-router';
import NavBar from '../components/Layout/NavBar';
import Grid from '@mui/material/Unstable_Grid2';

export default function Homepage() {
  return (
    <>
      <NavBar />
      <Grid container spacing={2} xs={12}>
        <Grid xs={2}>
          <div style={{ backgroundColor: 'red' }}>User Info</div>
        </Grid>
        <Grid xs={8}>
          <div style={{ backgroundColor: 'yellow' }}>
            {' '}
            <Outlet />
          </div>
        </Grid>
        <Grid xs={2}>
          <div style={{ backgroundColor: 'red' }}>Pending</div>
        </Grid>
      </Grid>
    </>
  );
}
