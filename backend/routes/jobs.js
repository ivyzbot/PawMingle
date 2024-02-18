var express = require('express');
var router = express.Router();
var jobsCtrl = require('../controllers/jobs');

// under the route /jobs
router.post('/create', jobsCtrl.createJob);

module.exports = router;
