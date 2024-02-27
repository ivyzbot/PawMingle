/* eslint-disable react/prop-types */
import { styled } from '@mui/material/styles';
import { useContext, useState } from 'react';
import moment from 'moment';
import ViewerButtons from './ViewerButtons';
import PosterButtons from './PosterButtons';
import UserAvatar from '../User/UserAvatar';
import { UserContext } from '../../pages/Homepage';
import {
  CardHeader,
  Typography,
  CardContent,
  Card,
  CardActions,
  CardMedia,
  IconButton,
  Collapse,
  Grid,
  Divider,
  Box,
  Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import PetsIcon from '@mui/icons-material/Pets';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function JobCard({ jobData }) {
  const states = useContext(UserContext);
  // console.log('States: ', states);
  // console.log('Job Data: ', jobData);
  // {name: 'ivy2', email: 'ivy2@pawmingle.com', is_admin: false, userID: '65d0d2a05664790bf8762f92'}
  const isInCandidate = jobData.candidates.includes(states.userID);
  const isSelected = jobData.selected === states.userID;
  const [expanded, setExpanded] = useState(false);

  const buttonColor =
    jobData.jobStatus === 'Pending'
      ? { color: 'green.secondary', backgroundColor: 'green.main' }
      : { color: 'primary.main', backgroundColor: 'grey.main' };

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card
      sx={{
        maxWidth: 800,
        border: '1px solid',
        borderColor: 'grey.main',
        borderRadius: 5,
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
            titleTypographyProps={{ variant: 'h5', color: 'secondary.main' }}
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
        {states.userID === jobData.posterID._id ? (
          <PosterButtons jobID={jobData._id} />
        ) : (
          <ViewerButtons
            isInCandidate={isInCandidate}
            jobStatus={jobData.jobStatus}
            isSelected={isSelected}
            jobID={jobData._id}
          />
        )}
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
        </CardContent>
      </Collapse>
    </Card>
  );
}
