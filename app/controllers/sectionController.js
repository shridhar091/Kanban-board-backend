const express = require('express');
const router = express.Router();
const Section = require('../models/sectionModel');

// GET all sections with tasks
router.get('/', async (req, res, next) => {
  try {
    const sections = await Section.find().populate('taskIds');
    res.json(sections);
  } catch (error) {
    next(error);
  }
});

// POST create new section
router.post('/', async (req, res, next) => {
  try {
    const { title } = req.body;
    const section = new Section({ title, taskIds: [] });
    await section.save();
    res.status(201).json(section);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
