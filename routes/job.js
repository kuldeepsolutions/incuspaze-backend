const job = require('../controllers/job');
const express = require('express');
const router = express.Router();

router.post('/job_post',job.post_job);

// edit jobs
router.post('/job_edit',job.job_edit);
// delete jobs
router.post('/job_delete',job.close_job);
router.get('/getJobs',job.getAllJobs);

module.exports = router;