const express = require('express');
const router = express.Router();
const Section = require('../models/sectionModel');
const Task = require('../models/taskModel');

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

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Section title is required' });
    }

    const section = new Section({ title, taskIds: [] });
    await section.save();

    res.status(201).json(section);
  } catch (error) {
    next(error);
  }
});

// PUT update section title
router.put('/:id', async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Section title is required' });
    }

    const updatedSection = await Section.findByIdAndUpdate(
      req.params.id,
      { title: title.trim() },
      { new: true, runValidators: true }
    );

    if (!updatedSection) {
      return res.status(404).json({ message: 'Section not found' });
    }

    res.json(updatedSection);
  } catch (error) {
    next(error);
  }
});

// DELETE section (and its tasks if needed)
router.delete('/:id', async (req, res, next) => {
  try {
    const section = await Section.findById(req.params.id);

    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    // If you want to delete tasks related to this section
    if (section.taskIds && section.taskIds.length > 0) {
      await Task.deleteMany({ _id: { $in: section.taskIds } });
    }

    await Section.findByIdAndDelete(req.params.id);

    res.json({ message: 'Section deleted successfully' });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
