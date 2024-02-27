import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../pages/Homepage';
import { JOB_TYPES, PET_TYPES } from '../../utilities/consts';
import { useCreateJobMutation } from '../../hooks/jobHook';
import { useGetUserPetQuery } from '../../hooks/userHook';
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  ImageListItem,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

export default function CreateJob() {
  const states = useContext(UserContext);
  const navigate = useNavigate();
  const {
    data: petData,
    isLoading: isPetDataLoading,
    error: isPetDataError,
  } = useGetUserPetQuery(states ? states.userID : null);
  // console.log('petData', petData);
  const { mutateAsync: postJob } = useCreateJobMutation();
  const [formData, setFormData] = useState({
    jobType: '',
    petType: '',
    startTime: '',
    endTime: '',
    location: '',
    price: 0,
    description: '',
    myPet: '',
  });

  console.log('formData', formData);
  const urlSelected =
    petData &&
    petData.data &&
    petData.data.petsOwn.length !== 0 &&
    formData.myPet
      ? petData.data.petsOwn.filter((pet) => pet._id === formData.myPet)[0]
          .imgURL
      : null;
  console.log('Create Job Form:', formData);

  function handleChange(evt) {
    const { name, value } = evt.target;
    let newFormData = {};
    newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const newFormData = { ...formData, posterID: states.userID };
    console.log('Job To Submit:', newFormData);
    delete newFormData.error;
    await postJob(newFormData);
    navigate('/');
  }

  return (
    <>
      {isPetDataLoading ? (
        <Typography>Loading</Typography>
      ) : isPetDataError ? (
        <Typography>{isPetDataError}</Typography>
      ) : (
        <Card
          sx={{
            maxWidth: 800,
            border: '1px solid',
            borderColor: 'grey.main',
            borderRadius: 5,
            py: 4,
          }}
          elevation={0}
        >
          {!petData || !petData.data || petData.data.petsOwn.length === 0 ? (
            <></>
          ) : (
            <Box>
              <FormControl sx={{ m: 2, minWidth: 180 }} size="medium">
                <InputLabel>Select My Pet</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  value={formData.myPet}
                  label="none"
                  name="myPet"
                  onChange={handleChange}
                  size="medium"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {petData.data.petsOwn.map((pet) => (
                    <MenuItem key={pet._id} value={pet._id}>
                      {pet.petName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ImageListItem
                sx={{
                  maxWidth: '60%',
                  height: 'auto',
                  my: 2,
                  mx: 'auto',
                  borderRadius: '1-px',
                }}
              >
                {formData.myPet ? (
                  <img
                    src={urlSelected}
                    style={{
                      borderRadius: '10px',
                    }}
                  />
                ) : null}
              </ImageListItem>
            </Box>
          )}

          <Grid container spacing={2} my={3} alignItems="center">
            <Grid item xs={6}>
              <Box display="flex" justifyContent="flex-start" paddingLeft={8}>
                <FormControl sx={{ m: 2, minWidth: 250 }} size="medium">
                  <InputLabel>JOB TYPE</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    value={formData.jobType}
                    label="none"
                    name="jobType"
                    onChange={handleChange}
                  >
                    {JOB_TYPES.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box display="flex" justifyContent="flex-start" paddingLeft={8}>
                <FormControl sx={{ m: 2, minWidth: 250 }} size="medium">
                  <InputLabel>PET TYPE</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    value={formData.petType}
                    label="none"
                    name="petType"
                    onChange={handleChange}
                  >
                    {PET_TYPES.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Typography color="grey.dark" fontWeight={500}>
                START TIME
              </Typography>
              <Box display="flex" justifyContent="flex-start" paddingLeft={8}>
                <FormControl sx={{ m: 2, minWidth: 250 }} size="small">
                  <TextField
                    // label="FROM"
                    variant="outlined"
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    sx={{ label: { color: 'red' } }}
                  />
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Typography color="grey.dark" fontWeight={500}>
                END TIME
              </Typography>
              <Box display="flex" justifyContent="flex-start" paddingLeft={8}>
                <FormControl sx={{ m: 2, minWidth: 250 }} size="small">
                  <TextField
                    // label="FROM"
                    variant="outlined"
                    type="datetime-local"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box display="flex" justifyContent="flex-start" paddingLeft={8}>
                <FormControl sx={{ m: 2, minWidth: 250 }} size="small">
                  <TextField
                    label="Location"
                    variant="outlined"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" justifyContent="flex-start" paddingLeft={8}>
                <FormControl sx={{ m: 2, minWidth: 250 }} size="small">
                  <TextField
                    label="Price"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" paddingLeft={2}>
              <FormControl sx={{ mb: 4, width: '84%' }}>
                <TextField
                  label="DESCRIPTION"
                  placeholder="A detailed description tends to attract more audience..."
                  multiline
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>
          </Grid>
          <Button variant="contained" color="green" onClick={handleSubmit}>
            Post Job
          </Button>
        </Card>
      )}
    </>
  );
}
