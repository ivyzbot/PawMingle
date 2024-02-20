const jobsDao = require('../daos/jobs');

module.exports = { createJob };

async function createJob(body) {
  const newJob = await jobsDao.create(body);
  // console.log('Create new job: ', newJob);
  return { success: true, data: newJob };
}
