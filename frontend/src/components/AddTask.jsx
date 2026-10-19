import React, { useState } from 'react'
import { Card } from './ui/card'
import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { toast } from 'sonner'
import api from '@/lib/axios'

const AddTask = ({ handleNewTaskAdded }) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const addTask = async () => {
        if (newTaskTitle.trim()) {
            try {
                await api.post("/tasks", { title: newTaskTitle });
                toast.success(`Task ${newTaskTitle} successfully added.`);
                handleNewTaskAdded();
            } catch (error) {
                console.error("Error when adding new task.", error);
                toast.error("Error when adding new task.", error);
            }

            setNewTaskTitle("");
        } else {
            toast.error("You need to add content of task.")
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    }
    return (
        <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
            <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                    type="text"
                    placeholder="What's new to do?"
                    className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                    value={newTaskTitle}
                    onChange={(even) => setNewTaskTitle(even.target.value)}
                    onKeyPress={handleKeyPress}
                />

                <Button
                    variant="gradient"
                    size="xl"
                    className="px-6"
                    onClick={addTask}
                >
                    <Plus className="size-6" />
                    Add
                </Button>
            </div>
        </Card>
    )
}

export default AddTask
