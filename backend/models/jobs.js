const jobsDao = require('../daos/jobs');

module.exports = { createJob, getAllJobs };

async function createJob(body) {
  const newJob = await jobsDao.create(body);
  // console.log('Create new job: ', newJob);
  return { success: true, data: newJob };
}

async function getAllJobs() {
  const allJobs = await jobsDao.find({});
  // console.log('Create new job: ', newJob);
  return { success: true, data: allJobs };
}
