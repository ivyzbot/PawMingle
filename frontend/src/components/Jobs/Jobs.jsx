import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../pages/Homepage';
import JobCard from './JobCard';
import { Helmet } from 'react-helmet-async';

import { useGetJobsQuery } from '../../hooks/jobHook';
import {
  Box,
  Button,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function Jobs() {
  // const states = useContext(UserContext);
  // console.log('UserContext:', states);
  const { data: jobsData, isLoading, error } = useGetJobsQuery();
  console.log('Jobs Data: ', jobsData);
  const navigate = useNavigate();
  function handleClick() {
    navigate('new');
  }

  const [selected, setSelectJob] = useState({
    jobSelected: '',
    petSelected: '',
  });
  const [jobDataFiltered, setJobDataFiltered] = useState();
  console.log('jobDataFiltered', jobDataFiltered);

  function applyFilter() {
    if (!jobsData) {
      return;
    } else if (selected.jobSelected && selected.petSelected) {
      //no filter
      setJobDataFiltered(
        jobsData.data.filter(
          (job) =>
            job.jobType === selected.jobSelected &&
            job.petType === selected.petSelected
        )
      );
    } else if (selected.jobSelected && !selected.petSelected) {
      //only job filter
      setJobDataFiltered(
        jobsData.data.filter((job) => job.jobType === selected.jobSelected)
      );
    } else if (!selected.jobSelected && selected.petSelected) {
      //only job filter
      setJobDataFiltered(
        jobsData.data.filter((job) => job.petType === selected.petSelected)
      );
    } else {
      setJobDataFiltered(jobsData.data);
    }
  }
  useEffect(() => applyFilter(), [selected]);

  function handleChange(evt) {
    const newSelected = { ...selected, [evt.target.name]: evt.target.value };
    setSelectJob(newSelected);
  }
  console.log(selected);

  return (
    <Box sx={{ my: 2 }}>
      <Helmet>
        <title>Pawmingle - Jobs</title>
      </Helmet>
      <Grid container spacing={2} my={3} alignItems="center">
        <Grid item xs={5}>
          <FormControl sx={{ m: 1, minWidth: 180 }} size="medium">
            <InputLabel id="demo-select-small-label">Job Type</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selected.jobSelected}
              label="jobType"
              name="jobSelected"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Walking">Walking</MenuItem>
              <MenuItem value="Feeding">Feeding</MenuItem>
              <MenuItem value="Daycare">Daycare</MenuItem>
              <MenuItem value="Boarding">Boarding</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={5}>
          <FormControl sx={{ m: 1, minWidth: 180 }} size="medium">
            <InputLabel id="demo-select-small-label">Pet Type</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selected.petSelected}
              label="petType"
              name="petSelected"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Dog">Dog</MenuItem>
              <MenuItem value="Cat">Cat</MenuItem>
              <MenuItem value="Rabbit">Rabbit</MenuItem>
              <MenuItem value="Bird">Bird</MenuItem>
              <MenuItem value="Fish">Fish</MenuItem>
              <MenuItem value="Hamster">Hamster</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Tooltip title="Create New Job" placement="right">
            <Fab color="green" aria-label="add" onClick={handleClick}>
              <AddIcon />
            </Fab>
          </Tooltip>
        </Grid>
      </Grid>

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading jobs</div>
      ) : (
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {jobDataFiltered
            ? jobDataFiltered.map((jobsData) => (
                <Grid key={jobsData._id} item xs={12}>
                  <JobCard jobData={jobsData} />
                </Grid>
              ))
            : jobsData.data.map((jobsData) => (
                <Grid key={jobsData._id} item xs={12}>
                  <JobCard jobData={jobsData} />
                </Grid>
              ))}
        </Grid>
      )}
    </Box>
  );
}
