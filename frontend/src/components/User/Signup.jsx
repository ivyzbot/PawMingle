import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Helmet } from 'react-helmet-async';
import { hashData } from '../../utilities/security';
import { useSignupMutation } from '../../hooks/userHook';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false,
  });
  const [disable, setDisable] = useState(true);
  const { mutateAsync: signup } = useSignupMutation();
  const navigate = useNavigate();

  function handleInputChange(evt) {
    const { name, value } = evt.target;
    let newFormData = {};
    if (name !== 'isAdmin') {
      newFormData = {
        ...formData,
        [name]: value,
      };
    } else if (name === 'isAdmin') {
      newFormData = {
        ...formData,
        isAdmin: !formData.isAdmin,
      };
    }
    setDisable(checkPassword(newFormData));
    setFormData(newFormData);
  }

  // console.log('Signup Form data:', formData);

  function checkPassword(formData) {
    if (
      !formData.password ||
      !formData.confirmPassword ||
      formData.password !== formData.confirmPassword
    ) {
      return true;
    }
    return false;
  }

  function hashPassword() {
    var currForm = { ...formData };
    if (currForm.password) {
      console.log('Signup - original password:', currForm.password);
      var hash = hashData(currForm.password);
      currForm.password = hash.hash;
      currForm.salt = hash.salt;
      currForm.iterations = hash.iterations;
    }
    return currForm;
  }

  async function handleSubmit(evt) {
    try {
      evt.preventDefault();
      const formDataNew = hashPassword();
      delete formDataNew.error;
      delete formDataNew.confirmPassword;
      console.log(formDataNew);
      await signup(formDataNew);
      // const data = await signup(formDataNew);
      // console.log('Signup API - return data:', data);
      navigate('/signin');
    } catch (err) {
      console.log('Signup - submit error:', err);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Sign Up</title>
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
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Usename"
                autoFocus
              />
            </Grid>
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
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Comfirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox name="isAdmin" color="primary" />}
                label="Is Admin"
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end" mb={2}>
            <Grid item>
              <Link to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
