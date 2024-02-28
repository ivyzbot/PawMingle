import {
  Badge,
  Box,
  Card,
  CardHeader,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import moment from 'moment';
import UserAvatar from '../User/UserAvatar';

export default function UserReviewCard({ reviewData, reviewType }) {
  return (
    <>
      <Card variant="outlined" sx={{ mt: 5 }}>
        <Typography
          variant="subtitle1"
          ml={2}
          mt={1}
          align="left"
          color="primary.main"
          gutterBottom
        >
          {reviewType === 'giveReviews' ? 'Given to' : 'Received from'}
        </Typography>
        <Box>
          <UserAvatar
            name={
              reviewType === 'giveReviews'
                ? reviewData.receiverID.name
                : reviewData.giverID.name
            }
            size={25}
          />
          <Typography
            display="inline"
            variant="subtitle1"
            mx={2}
            mb={2}
            fontWeight={400}
          >
            {reviewType === 'giveReviews'
              ? reviewData.receiverID.name
              : reviewData.giverID.name}
          </Typography>
        </Box>

        <Rating
          name="half-rating-read"
          defaultValue={reviewData && reviewData.score ? reviewData.score : 0}
          precision={0.5}
          readOnly
        />
        <Typography variant="subtitle1">{`On ${moment(
          reviewData.createdAt
        ).format('YYYY-MM-D')}`}</Typography>
      </Card>
    </>
  );
}
