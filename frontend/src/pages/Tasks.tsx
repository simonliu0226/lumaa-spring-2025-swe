import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
            <ul>
                {tasks.map((task: any) => (
                    <li key={task.id}>
                        {task.title} -- {task.description}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Tasks;