const express = require('express');
const router = express.Router();
const sectionRoutes = require('../app/controllers/sectionController');
const taskRoutes = require('../app/controllers/taskController');

router.use('/sections', sectionRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;
