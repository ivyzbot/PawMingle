import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
// import { useLocation } from 'react-router';
import moment from 'moment';
// import PosterButtons from './PosterButtons';
import { UserContext } from '../../pages/Homepage';
import { useGetOneJobQuery } from '../../hooks/jobHook';
import {
  CardHeader,
  Typography,
  CardContent,
  Card,
  Box,
  CardMedia,
  Grid,
  Chip,
  Divider,
  CardActions,
  Collapse,
} from '@mui/material';
import CadidateCard from './CandidateCard';
import UserAvatar from '../User/UserAvatar';
import apiClient from '../../apiClient/apiClient';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import PetsIcon from '@mui/icons-material/Pets';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function JobDetailsCard() {
  const states = useContext(UserContext);
  //   console.log('States: ', states);
  // {name: 'ivy2', email: 'ivy2@pawmingle.com', is_admin: false, userID: '65d0d2a05664790bf8762f92'}
  const params = useParams();
  const { jobid } = params;
  // const {
  //   data: jobDataRaw,
  //   isLoading,
  //   error,
  // } = useGetOneJobQuery(jobid);
  let isLoading = false;
  let error = null;
  const [jobData, setJobData] = useState();
  const [expanded, setExpanded] = useState(false);
  function handleExpandClick() {
    setExpanded(!expanded);
  }
  const buttonColor =
    !jobData || jobData.jobStatus === 'Pending'
      ? { color: 'green.secondary', backgroundColor: 'green.main' }
      : { color: 'primary.main', backgroundColor: 'grey.main' };

  async function useGetOneJobQuery(jobID, setFn) {
    const jobDataRaw = (await apiClient.get(`jobs/getone/${jobID}`)).data;
    setFn(jobDataRaw.data);
  }

  useEffect(() => {
    useGetOneJobQuery(jobid, setJobData);
  }, [jobid]);

  // console.log('Job Data:', jobData);

  return (
    <>
      {!jobData ? (
        <Box>Loading</Box>
      ) : error ? (
        <Box>Error</Box>
      ) : (
        <Card
          sx={{
            maxWidth: 800,
            border: '1px solid',
            borderColor: 'grey.main',
            borderRadius: 5,
            marginTop: 5,
          }}
          elevation={0}
        >
          {jobData.myPet ? (
            <CardMedia
              component="img"
              height="300px"
              image={jobData.myPet.imgURL}
              alt="No Pet Picture"
              // sx={{ height: 300 }}
            />
          ) : null}

          <Grid container spacing={0}>
            <Grid item xs={10}>
              <CardHeader
                avatar={<UserAvatar name={jobData.posterID._id} size={50} />}
                titleTypographyProps={{
                  variant: 'h5',
                  color: 'secondary.main',
                }}
                title={`${jobData.posterID.name}`}
                subheaderTypographyProps={{ color: 'text.secondary' }}
                subheader={`Posted at ${moment(jobData.createdAt).format(
                  'YYYY-MM-D, h:mm a'
                )}`}
                sx={{ fontSize: '40px' }}
              />
            </Grid>
            <Grid item xs={2} marginTop={3}>
              <Chip label={jobData.jobStatus} sx={buttonColor} />
            </Grid>
          </Grid>

          <Divider
            variant="middle"
            sx={{ borderBottomWidth: 2, width: '60%', margin: 'auto' }}
          />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {' '}
                <Box sx={{ display: 'flex' }} paddingLeft={10}>
                  <CategoryIcon
                    sx={{ verticalAlign: 'middle', mr: 1, color: '#616161' }}
                  />
                  <Typography
                    display="inline"
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ verticalAlign: 'middle' }}
                    gutterBottom
                  >
                    {`Job Type: ${jobData.jobType}`}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }} paddingLeft={10}>
                  <PetsIcon
                    sx={{ verticalAlign: 'middle', mr: 1, color: '#616161' }}
                  />
                  <Typography
                    display="inline"
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ verticalAlign: 'middle' }}
                    gutterBottom
                  >
                    {`Pet Type: ${jobData.petType}`}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }} paddingLeft={10}>
                  <PaidOutlinedIcon
                    sx={{ verticalAlign: 'middle', mr: 1, color: '#616161' }}
                  />
                  <Typography
                    display="inline"
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ verticalAlign: 'middle' }}
                    gutterBottom
                  >
                    {`Price: $${jobData.price}`}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ display: 'flex' }}>
                  <AccessTimeFilledIcon
                    sx={{ verticalAlign: 'middle', mr: 1, color: '#616161' }}
                  />
                  <Typography
                    display="inline"
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ verticalAlign: 'middle' }}
                    gutterBottom
                  >
                    {`Start Time: ${moment(jobData.startTime).format(
                      'YYYY-MM-D, h:mm a'
                    )}`}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex' }}>
                  <AccessTimeIcon
                    sx={{ verticalAlign: 'middle', mr: 1, color: '#616161' }}
                  />
                  <Typography
                    display="inline"
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ verticalAlign: 'middle' }}
                    gutterBottom
                  >
                    {`End Time: ${moment(jobData.endTime).format(
                      'YYYY-MM-D, h:mm a'
                    )}`}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <LocationOnIcon
                    sx={{ verticalAlign: 'middle', mr: 1, color: '#616161' }}
                  />
                  <Typography
                    display="inline"
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ verticalAlign: 'middle' }}
                    gutterBottom
                  >
                    {`Location: ${jobData.location}`}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>

          <CardActions>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Divider
              variant="middle"
              sx={{ borderBottomWidth: 2, width: '60%', margin: 'auto' }}
            />
            <CardContent>
              <Typography paragraph fontWeight={700}>
                Job Details:
              </Typography>
              <Typography paragraph>{jobData.description}</Typography>
              <Typography paragraph fontWeight={700}>
                Candidates:
              </Typography>
              {jobData.candidates.length === 0
                ? 'More candidates are coming in...'
                : jobData.candidates.map((candidate) => (
                    <CadidateCard
                      key={candidate._id}
                      name={candidate.name}
                      candidateid={candidate._id}
                      jobid={jobData._id}
                      jobData={jobData}
                      setJobData={jobData}
                    />
                  ))}
            </CardContent>
          </Collapse>
        </Card>
      )}
    </>
  );
}
