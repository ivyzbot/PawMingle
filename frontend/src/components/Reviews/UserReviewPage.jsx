import { useContext } from 'react';
import { UserContext } from '../../pages/Homepage';
import { useGetUserReviewQuery } from '../../hooks/reviewHooks';
import UserReviewCard from './UserReviewCard';
import { Box, Typography } from '@mui/material';
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
        <Box>
          {userReviewData.data.giveReviews.map((reviewData) => (
            <UserReviewCard
              key={reviewData._id}
              reviewData={reviewData}
              reviewType="giveReviews"
            />
          ))}
          {userReviewData.data.receiveReviews.map((reviewData) => (
            <UserReviewCard
              key={reviewData._id}
              reviewData={reviewData}
              reviewType="receiveReviews"
            />
          ))}
        </Box>
      )}
    </>
  );
}
