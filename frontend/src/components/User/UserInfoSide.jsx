import { useContext } from 'react';
import { useNavigate } from 'react-router';
import UserAvatar from './UserAvatar';
import { UserContext } from '../../pages/Homepage';
import { Box, Button, Card, Rating, Typography } from '@mui/material';
import { useGetJobCountQuery } from '../../hooks/jobHook';
import { useGetReviewCountQuery } from '../../hooks/reviewHooks';

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

  // console.log('isLoading', isReviewLoading);
  // console.log('error', isReviewCountError);
  // console.log('reviewCount', reviewCount);

  return (
    <Card sx={{ minHeight: 500, mt: 5 }}>
      <UserAvatar name={states ? states.userID : 'no user info'} />
      {isJobCountLoading || isReviewLoading ? (
        <Typography>loading</Typography>
      ) : isJobCountError || isReviewCountError ? (
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
    </Card>
  );
}
