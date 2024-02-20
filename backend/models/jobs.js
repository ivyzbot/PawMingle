const jobsDao = require('../daos/jobs');

module.exports = { createJob, getAllJobs };

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
