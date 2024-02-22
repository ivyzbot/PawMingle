const jobsDao = require('../daos/jobs');

module.exports = { createJob, getAllJobs, updateJob, getOneJob };

async function createJob(body) {
  const newJob = await jobsDao.create(body);
  // console.log('Create new job: ', newJob);
  return { success: true, data: newJob };
}

async function getAllJobs() {
  const allJobs = await jobsDao.find({}).populate('posterID', ['_id', 'name']);
  // console.log('Get all jobs: ', allJobs);
  return { success: true, data: allJobs };
}

async function updateJob(jobID, body) {
  // console.log('Update Job - jobID', jobID);
  // console.log('Update Job - body', body);
  const jobData = await jobsDao.findById(jobID);

  for (let [key, val] of Object.entries(body)) {
    if (key === 'description' || key === 'jobStatus' || key === 'selected') {
      jobData[key] = val;
    }
    if (key === 'candidates') {
      jobData[key].push(val);
    }
  }
  await jobData.save();
  // console.log('Update job: ', jobData);
  return { success: true, data: jobData };
}

async function getOneJob(jobID) {
  const onejob = await jobsDao
    .findById(jobID)
    .populate('posterID', ['_id', 'name'])
    .populate('candidates', ['_id', 'name']);
  console.log('Get onejob: ', onejob);
  return { success: true, data: onejob };
}
