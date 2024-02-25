import { Card, CardHeader, Rating, Typography } from '@mui/material';
import moment from 'moment';

export default function UserReviewCard({ reviewData, reviewType }) {
  return (
    <>
      <Card variant="outlined" sx={{ minWidth: 120, mt: 5 }}>
        <CardHeader
          //   avatar={<UserAvatar name={jobData.posterID._id} />}
          title={reviewType === 'giveReviews' ? 'Given' : 'Received'}
          subheader={`On ${moment(reviewData.createdAt).format('YYYY-MM-D')}`}
        />
        <Rating
          name="half-rating-read"
          defaultValue={reviewData && reviewData.score ? reviewData.score : 0}
          precision={0.5}
          readOnly
        />
        <Typography
          component="div"
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
        >
          {reviewType === 'giveReviews'
            ? `To ${reviewData.receiverID.name}`
            : `From ${reviewData.giverID.name}`}
        </Typography>
      </Card>
    </>
  );
}
