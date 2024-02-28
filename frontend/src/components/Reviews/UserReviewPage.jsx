import { useContext } from 'react';
import { UserContext } from '../../pages/Homepage';
import { useGetUserReviewQuery } from '../../hooks/reviewHooks';
import UserReviewCard from './UserReviewCard';
import { Box, Grid, Typography } from '@mui/material';
export default function UserReviewPage() {
  const states = useContext(UserContext);
  const {
    data: userReviewData,
    isLoading: isUserReviewLoading,
    error: isUserReviewError,
  } = useGetUserReviewQuery(states ? states.userID : null);
  console.log(userReviewData);
  return (
    <>
      {isUserReviewLoading ? (
        <Typography>Loading</Typography>
      ) : isUserReviewError ? (
        <Typography>{isUserReviewError}</Typography>
      ) : (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {userReviewData.data.giveReviews.map((reviewData) => (
            <Grid item xs={4} key={reviewData._id}>
              <UserReviewCard
                reviewData={reviewData}
                reviewType="giveReviews"
              />
            </Grid>
          ))}
          {userReviewData.data.receiveReviews.map((reviewData) => (
            <Grid item xs={4} key={reviewData._id}>
              <UserReviewCard
                reviewData={reviewData}
                reviewType="receiveReviews"
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
