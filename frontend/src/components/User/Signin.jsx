import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Helmet } from 'react-helmet-async';
import {
  useGetUserDetailsMutation,
  useSigninMutation,
} from '../../hooks/userHook';
import { hashDataWithSaltRounds, storeToken } from '../../utilities/security';

export default function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [disable, setDisable] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const { mutateAsync: getUserDetails } = useGetUserDetailsMutation();
  const { mutateAsync: signin } = useSigninMutation();
  const navigate = useNavigate();

  function handleInputChange(evt) {
    const { name, value } = evt.target;
    let newFormData = {};
    newFormData = {
      ...formData,
      [name]: value,
    };
    setDisable(!newFormData.email || !newFormData.password);
    setFormData(newFormData);
  }

  async function handleSubmit(evt) {
    try {
      evt.preventDefault();
      const newFormData = { ...formData };
      delete newFormData.error;
      // console.log('Form Data:', newFormData);
      const datareturned = await getUserDetails({ email: newFormData.email });
      if (!datareturned) {
        setErrMsg('User dose not exists');
        return;
      }

      const hashedPassword = hashDataWithSaltRounds(
        newFormData.password,
        datareturned.salt,
        datareturned.iterations
      );
      // console.log('Signin hashed password:', hashedPassword);
      newFormData.password = hashedPassword;
      const token = await signin(newFormData);
      storeToken(token);
      // console.log('Signin - token:', token);
      navigate(`/home/jobs`);
    } catch (err) {
      console.log('Signin - submit error:', err);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Pawmingle - Sign In</title>
      </Helmet>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          noValidate
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            disabled={disable}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end" mb={8} mt={1}>
            <Grid item>
              <Link to="/" variant="body2">
                No account yet? Sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
