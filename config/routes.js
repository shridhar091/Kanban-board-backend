const express = require('express');
const router = express.Router();

// ===== CORS Middleware for all API routes =====
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://kanban-board-frontend-rho.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Exit early for preflight requests
  }
  next();
});


const sectionRoutes = require('../app/controllers/sectionController');
const taskRoutes = require('../app/controllers/taskController');

router.use('/sections', sectionRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;
