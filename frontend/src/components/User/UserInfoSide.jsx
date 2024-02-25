import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import UserAvatar from './UserAvatar';
import { UserContext } from '../../pages/Homepage';
import AddPetCard from './AddPetCard';
import PetCard from './PetCard';
import { Box, Button, Card, Rating, Typography } from '@mui/material';
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

  console.log('isLoading', isPetDataLoading);
  console.log('error', isPetDataError);
  console.log('reviewCount', petData);

  return (
    <Card sx={{ minHeight: 500, mt: 5 }}>
      <UserAvatar name={states ? states.userID : 'no user info'} />
      {isJobCountLoading || isReviewLoading || isPetDataLoading ? (
        <Typography>loading</Typography>
      ) : isJobCountError || isReviewCountError || isPetDataError ? (
        <Typography>{isJobCountError}</Typography>
      ) : (
        <>
          <Box>
            <Typography>{jobCount.data.jobsPosted}</Typography>
            <Typography>Jobs Posted</Typography>
            <Typography>Score As a Hirer:</Typography>
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
          <Box>
            <Typography>{jobCount.data.jobsDone}</Typography>
            <Typography>Jobs Taken</Typography>
            <Typography>Score As a Service Provider:</Typography>
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
        </>
      )}
      <Button onClick={() => navigate('user/jobs')}> Me Page</Button>
      <Button onClick={() => setOpen(true)}> Add My Pet</Button>
      <AddPetCard open={open} setOpen={setOpen} />
      <Box>
        <Typography>My Pets:</Typography>
        {!petData.data.petsOwn || petData.data.petsOwn.length === 0 ? (
          <Typography>No Pets Yet</Typography>
        ) : (
          petData.data.petsOwn.map((pet) => <PetCard key={pet._id} pet={pet} />)
        )}
      </Box>
    </Card>
  );
}
