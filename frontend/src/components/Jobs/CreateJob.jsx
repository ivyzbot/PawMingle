import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../pages/Homepage';
import { JOB_TYPES, PET_TYPES } from '../../utilities/consts';
import { useCreateJobMutation } from '../../hooks/jobHook';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

export default function CreateJob() {
  const states = useContext(UserContext);
  const navigate = useNavigate();
  const { mutateAsync: postJob } = useCreateJobMutation();
  const [formData, setFormData] = useState({
    jobType: '',
    petType: '',
    startTime: '',
    endTime: '',
    location: '',
    price: 0,
    description: '',
  });

  // console.log('Create Job Form:', formData);

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
      <Box sx={{ mt: 10 }}>
        <FormControl sx={{ m: 2, minWidth: 180 }} size="small">
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
        <FormControl sx={{ m: 2, minWidth: 180 }} size="small">
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
          <Box>
            <p>START TIME</p>
            <FormControl sx={{ m: 2, minWidth: 180 }} size="small">
              <TextField
                // label="FROM"
                variant="outlined"
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
              />
            </FormControl>
          </Box>
          <Box>
            <p>END TIME</p>
            <FormControl sx={{ m: 2, minWidth: 180 }} size="small">
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
        </FormControl>
        <FormControl sx={{ m: 2, minWidth: 180 }} size="small">
          <TextField
            label="Location"
            variant="outlined"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ m: 2, minWidth: 180 }} size="small">
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
        <FormControl sx={{ m: 2, minWidth: 180 }} size="small">
          <TextField
            label="DESCRIPTION"
            placeholder="Let your audience to know more..."
            multiline
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormControl>
        <Button variant="contained" color="green" onClick={handleSubmit}>
          Post Job
        </Button>
      </Box>
    </>
  );
}
