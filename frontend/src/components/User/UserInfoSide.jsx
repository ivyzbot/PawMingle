import { useContext, useEffect, useState } from 'react';
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
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';

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
    refetch: petRefetch,
  } = useGetUserPetQuery(states ? states.userID : null);
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // console.log('isLoading', isPetDataLoading);
  // console.log('error', isPetDataError);
  // console.log('reviewCount', reviewCount);
  useEffect(() => {
    petRefetch();
  }, [refresh]);

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
          <Button
            onClick={() => navigate('user/jobs')}
            sx={{ fontSize: 18 }}
            startIcon={<DirectionsWalkIcon />}
          >
            Me Page
          </Button>
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
                    reviewCount && reviewCount.data.reviewsHirer.length > 0
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
                    reviewCount && reviewCount.data.reviewsProvider.length > 0
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
      <Divider sx={{ borderBottomWidth: 2, my: 1 }} />
      <Button
        onClick={() => setOpen(true)}
        sx={{ fontSize: 18, my: 1 }}
        startIcon={<FileUploadIcon />}
      >
        Add My Pet
      </Button>
      <AddPetCard
        open={open}
        setOpen={setOpen}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <Box>
        <Typography variant="h6" mb={1}>
          My Pets:
        </Typography>
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
