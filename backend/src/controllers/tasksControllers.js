import Task from '../models/Tasks.js'

export const getAllTasks = async (req, res) => {
    try {
        const result = await Task.aggregate([
            {
                $facet: {
                    tasks: [{ $sort: { createdAt: -1 } }],
                    activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
                    completeCount: [{ $match: { status: "complete" } }, { $count: "count" }],
                },
            },
        ]);

        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0;
        const completeCount = result[0].completeCount[0]?.count || 0;

        res.status(200).json({ tasks, activeCount, completeCount });
    } catch (error) {
        console.error("Error when call getAllTasks", error);
        res.status(500).json({ message: "System error!" });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task({ title });

        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error when call createTask", error);
        res.status(500).json({ message: "System error!" })
    }
};

export const updateTask = async (req, res) => {
    try {
        const { title, status, completedAt } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                status,
                completedAt
            },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task is not exist!" })
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error when call updateTask", error);
        res.status(500).json({ message: "System error!" })
    }
};

export const deleteTask = async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id);

        if (!deleteTask) {
            return res.status(404).json({ message: "Task is not exists!" });
        }

        res.status(200).json(deleteTask);
    } catch (error) {
        console.error("Error when call deleteTask", error);
        res.status(500).json({ message: "System error!" })
    }
};
