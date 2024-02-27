import Typography from '@mui/material/Typography';
import { Link, Outlet } from 'react-router-dom';

export default function Copyright() {
  return (
    <>
      <Outlet />
      <Typography variant="body2" color="text.secondary" align="center" mt={2}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          PawMingle
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </>
  );
}
