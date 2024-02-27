import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import UserAvatar from './UserAvatar';
import { UserContext } from '../../pages/Homepage';
import AddPetCard from './AddPetCard';
import PetCard from './PetCard';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import { useGetJobCountQuery } from '../../hooks/jobHook';
import { useGetReviewCountQuery } from '../../hooks/reviewHooks';
import { useGetUserPetQuery } from '../../hooks/userHook';

export default function UserInfoSide() {
  const states = useContext(UserContext);
  // const [reviewScores, setReviewScores] = useState()
  // console.log('User Info Side - user states:', states);
  const navigate = useNavigate();
  const {
    data: jobCount,
    isLoading: isJobCountLoading,
    error: isJobCountError,
  } = useGetJobCountQuery(states ? states.userID : null);
  const {
    data: reviewCount,
    isLoading: isReviewLoading,
    error: isReviewCountError,
  } = useGetReviewCountQuery(states ? states.userID : null);
  const {
    data: petData,
    isLoading: isPetDataLoading,
    error: isPetDataError,
  } = useGetUserPetQuery(states ? states.userID : null);
  const [open, setOpen] = useState(false);

  // console.log('isLoading', isPetDataLoading);
  // console.log('error', isPetDataError);
  // console.log('reviewCount', petData);

  return (
    <Card
      elevation={0}
      sx={{
        minHeight: 500,
        mt: 5,
        ml: 2,
        border: '1px solid',
        borderColor: 'grey.main',
        borderRadius: 5,
        paddingTop: 3,
        paddingBottom: 3,
        px: 2,
      }}
    >
      <UserAvatar name={states ? states.userID : 'no user info'} size={80} />
      {isJobCountLoading || isReviewLoading || isPetDataLoading ? (
        <Typography>loading</Typography>
      ) : isJobCountError || isReviewCountError || isPetDataError ? (
        <Typography>{isJobCountError}</Typography>
      ) : (
        <>
          <Typography variant="h2" my={2}>
            {states ? states.name : ''}
          </Typography>
          <Divider sx={{ borderBottomWidth: 2 }} />

          <Grid container columnSpacing={2} px={8} py={4}>
            <Grid item xs={2} marginRight={4}>
              <Typography variant="h2" color="primary.main" fontWeight={400}>
                {jobCount.data.jobsPosted}
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography align="left">Jobs Pawsted</Typography>
              <Typography align="left">Score As a Hirer:</Typography>
              <Box sx={{ textAlign: 'left' }}>
                <Rating
                  name="half-rating-read"
                  defaultValue={
                    reviewCount && reviewCount.data.reviewsHirer[0].avg
                      ? reviewCount.data.reviewsHirer[0].avg
                      : 0
                  }
                  precision={0.5}
                  readOnly
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container columnSpacing={2} px={8} py={2}>
            <Grid item xs={2} marginRight={4}>
              <Typography variant="h2" color="primary.main" fontWeight={400}>
                {jobCount.data.jobsDone}
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography align="left">Jobs Taken</Typography>
              <Typography align="left">Score As a Service Provider:</Typography>
              <Box sx={{ textAlign: 'left' }}>
                <Rating
                  name="half-rating-read"
                  defaultValue={
                    reviewCount && reviewCount.data.reviewsProvider[0].avg
                      ? reviewCount.data.reviewsProvider[0].avg
                      : 0
                  }
                  precision={0.5}
                  readOnly
                />
              </Box>
            </Grid>
          </Grid>
        </>
      )}
      <Button onClick={() => navigate('user/jobs')}> Me Page</Button>
      <Button onClick={() => setOpen(true)}> Add My Pet</Button>
      <AddPetCard open={open} setOpen={setOpen} />
      <Box>
        <Typography>My Pets:</Typography>
        {!petData ||
        !petData.data ||
        !petData.data.petsOwn ||
        petData.data.petsOwn.length === 0 ? (
          <Typography>No Pets Yet</Typography>
        ) : (
          petData.data.petsOwn.map((pet) => <PetCard key={pet._id} pet={pet} />)
        )}
      </Box>
    </Card>
  );
}
