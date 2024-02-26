import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { getTokenDetails } from '../utilities/helperFuncs.js';
import { Box, Container, Grid, Typography } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import RateReviewIcon from '@mui/icons-material/RateReview';

function LandingPage() {
  const navigate = useNavigate();
  const tokenDetails = getTokenDetails();
  // console.log('Token Details: ', tokenDetails);

  useEffect(() => {
    if (tokenDetails && tokenDetails.name) {
      navigate('/home/jobs');
    }
  });

  // var interval = setInterval(function () {
  //   var countForVideo = document.getElementById('myVideo').readyState;
  //   console.log(countForVideo);
  //   if (countForVideo == 4) {
  //     document.getElementById('myVideo').play();
  //     clearInterval(interval);
  //   }
  // }, 2000);

  return (
    <>
      <video autoPlay muted loop id="myVideo">
        <source src="/pet_video.webm" type="video/webm" />
        {/* <source src="../assets/1.mp4" type="video/mp4" /> */}
      </video>
      <Container maxWidth="md">
        <Box
          maxheight={200}
          maxwidth={400}
          my={20}
          display="flex"
          alignItems="center"
          // gap={4}
          // p={10}
        >
          <Grid container spacing={0} columns={12} maxWidth="xs">
            <Grid
              item
              xs={6}
              px={3}
              sx={{ bgcolor: 'secondary.main', opacity: 0.9 }}
            >
              <Container component="main" maxWidth="xs">
                <Box
                  my={5}
                  alignItems="center"
                  display="flex"
                  flexDirection="column"
                >
                  <Typography
                    variant="h4"
                    color="light.main"
                    fontWeight={700}
                    gutterBottom
                  >
                    Join Our Pet-Lover Community Today!
                  </Typography>
                  <Grid container spacing={1} columns={16} mt={2}>
                    <Grid item xs={4}>
                      <AddAPhotoIcon color="light" fontSize="large" />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography
                        align="left"
                        color="light.main"
                        fontWeight={700}
                        variant="h6"
                      >
                        Pet Profiles
                      </Typography>
                      <Typography align="left">
                        Unleash the Fun with Your Pet Profiles
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} columns={16} mt={1}>
                    <Grid item xs={4}>
                      <WorkOutlineIcon color="light" fontSize="large" />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography
                        align="left"
                        color="light.main"
                        fontWeight={700}
                        variant="h6"
                      >
                        Pet Jobs Marketplace
                      </Typography>
                      <Typography align="left">
                        Post exciting pet-related jobs effortlessly
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} columns={16} mt={1}>
                    <Grid item xs={4}>
                      <RateReviewIcon color="light" fontSize="large" />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography
                        align="left"
                        color="light.main"
                        fontWeight={700}
                        variant="h6"
                      >
                        Tail-Wagging Reviews
                      </Typography>
                      <Typography align="left">
                        Rate and review your pet-loving peers
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  border: '4px solid',
                  borderColor: 'white',
                  bgcolor: 'white',
                }}
              >
                <Outlet />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default LandingPage;
