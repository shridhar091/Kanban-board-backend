const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');
const Section = require('../models/sectionModel');

// POST add new task
router.post('/', async (req, res, next) => {
  try {
    const { title, description, dueDate, assignee, sectionId } = req.body;
    const task = new Task({ title, description, dueDate, assignee, sectionId });
    await task.save();

    await Section.findByIdAndUpdate(sectionId, { $push: { taskIds: task._id } });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

// PUT update task
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, dueDate, assignee, sectionId } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const oldSectionId = task.sectionId.toString();
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.assignee = assignee;
    task.sectionId = sectionId;
    await task.save();

    // If section changed, update section task arrays
    if (oldSectionId !== sectionId) {
      await Section.findByIdAndUpdate(oldSectionId, { $pull: { taskIds: task._id } });
      await Section.findByIdAndUpdate(sectionId, { $push: { taskIds: task._id } });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
});

// DELETE task
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    await Section.findByIdAndUpdate(task.sectionId, { $pull: { taskIds: task._id } });

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
