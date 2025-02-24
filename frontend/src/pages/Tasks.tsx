import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Task from '../components/Task';

const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setTasks(response.data);
                console.log(response.data);
            } catch (err) {
                alert('Failed to fetch tasks');
            }
        };

        getTasks();
    }, []);


    return (
        <div>
            <h1>Tasks</h1>
            {tasks.map((task: any) => (
                <Task
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    isComplete={task.iscomplete}
                    onEdit={(id: number) => console.log('Edit', id)}
                    onDelete={(id: number) => console.log('Delete', id)}
                    onToggleComplete={(id: number) => console.log('Toggle', id)}
                />
            ))}
        </div>
    )
}

export default Tasks;