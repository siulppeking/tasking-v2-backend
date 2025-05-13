const User = require('../models/user.model')
const Task = require('../models/task.model');

const taskController = {
    getAll: async (req, res) => {
        const user = req.token.id;
        const tasks = await Task.find({ active: true, user })
            .sort({
                date: 'desc'
            });
        const filteredTasks = tasks.map(task => {
            return {
                idtask: task.id,
                title: task.title,
                description: task.description,
                complete: task.complete,
                date: task.date,
                createdAt: task.createdAt
            }
        });

        return res.status(200).json(filteredTasks);
    },
    create: async (req, res) => {
        const user = req.token.id;

        const { title, description, date } = req.body;

        const newTask = new Task({ title, description, date, user });

        const taskSaved = await newTask.save();
        if (!taskSaved) return res.status(400).json({ message: "Task not saved." });

        return res.status(201).json({
            idtask: taskSaved._id,
            title: taskSaved.title,
            description: taskSaved.description,
            date: taskSaved.date,
            createdAt: taskSaved.createdAt
        });
    },
    getById: async (req, res) => {
        const user = req.token.id;
        const { id } = req.params;
        const task = await Task.findById({ _id: id, user });
        if (!task) return res.status(400).json({ message: "Task not found." });

        return res.status(200).json({
            idtask: task.id,
            title: task.title,
            description: task.description,
            complete: task.complete,
            date: task.date
        });
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { title, description, date } = req.body;
        const taskFound = await Task.findById({ _id: id });
        if (!taskFound) return res.status(400).json({ message: "Task not found." });

        const taskUpdated = await Task.updateOne({ _id: id }, { title, description, date });

        if (!taskUpdated) return res.status(400).json({ message: "Task not updated." });

        return res.status(200).json({
            idtask: taskUpdated._id,
            title: taskUpdated.title,
            description: taskUpdated.description,
            date: taskUpdated.date,
            createdAt: taskUpdated.createdAt
        });
    },
    delete: async (req, res) => {
        const { id } = req.params;
        const taskFound = await Task.findById({ _id: id });
        if (!taskFound) return res.status(400).json({ message: "Task not found." });

        const taskUpdated = await Task.updateOne({ _id: id }, { active: false });

        if (!taskUpdated) return res.status(400).json({ message: "Task not updated." });

        return res.status(200).json({ message: "Task delete" });
    },
    complete: async (req, res) => {
        const { id } = req.params;
        const taskFound = await Task.findById({ _id: id });
        if (!taskFound) return res.status(400).json({ message: "Task not found." });
        const taskUpdated = await Task.updateOne({ _id: id }, { complete: !taskFound.complete });
        if (!taskUpdated) return res.status(400).json({ message: "Task not updated." });

        return res.status(200).json({ message: "Task completed" });
    }
}

module.exports = taskController;