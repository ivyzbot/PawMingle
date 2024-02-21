var express = require('express');
var router = express.Router();
var jobsCtrl = require('../controllers/jobs');

// under the route /jobs
router.post('/create', jobsCtrl.createJob);
router.get('/getall', jobsCtrl.getAllJobs);
router.get('/getone/:jobid', jobsCtrl.getOneJob);
router.patch('/update/:jobid', jobsCtrl.updateJob);

module.exports = router;
