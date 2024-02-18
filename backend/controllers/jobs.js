const jobMdl = require('../models/jobs');

module.exports = { createJob };

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
