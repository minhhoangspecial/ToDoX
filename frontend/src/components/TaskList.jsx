import React from 'react'
import TaskEmptyState from './TaskEmptyState';
import TaskCard from './TaskCard';

const TaskList = () => {
    let filter = "all";
    const filteredTasks = [
        {
            _id: "1",
            title: "learn React",
            status: "active",
            completedAt: null,
            createAt: new Date(),
        },

        {
            _id: "2",
            title: "learn Python",
            status: "completed",
            completedAt: new Date(),
            createdAt: new Date(),
        }
    ]; // Replace with your actual

    if (!filteredTasks || filteredTasks.length === 0) {
        return <TaskEmptyState filter={filter} />;
    }
    return (
        <div className="space-y-3">
            {filteredTasks.map((task, index) =>
                <TaskCard
                    key={task._id ?? index}
                    task={task}
                    index={index}
                />
            )
            }
        </div>
    )
}

export default TaskList
