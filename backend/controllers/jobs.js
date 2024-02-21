const jobMdl = require('../models/jobs');

module.exports = { createJob, getAllJobs, updateJob };

async function createJob(req, res) {
  try {
    const jobData = await jobMdl.createJob(req.body);
    // console.log('controller-createJob', jobData);
    if (!jobData.success) {
      res.status(400).json({ errorMsg: jobData.error });
      return;
    }
    res.json(jobData);
  } catch (err) {
    console.log('controller-create-job-err', err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function getAllJobs(req, res) {
  try {
    const jobData = await jobMdl.getAllJobs();
    // console.log('controller-getAllJobs', jobData);
    if (!jobData.success) {
      res.status(400).json({ errorMsg: jobData.error });
      return;
    }
    res.json(jobData);
  } catch (err) {
    console.log('controller-get-all-job-err', err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function updateJob(req, res) {
  const jobID = req.params.jobid;
  console.log('update job - jobID: ', jobID);
  try {
    const jobData = await jobMdl.updateJob(jobID, req.body);
    // console.log('controller-update job', jobData);
    if (!jobData.success) {
      res.status(400).json({ errorMsg: jobData.error });
      return;
    }
    res.json(jobData);
  } catch (err) {
    console.log('controller-update job', err);
    res.status(500).json({ errorMsg: err.message });
  }
}
