import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Task from '../../components/Task/Task';
import styles from './Tasks.module.css';

interface Task {
    id: number;
    title: string;
    description: string;
    iscomplete: boolean;
}

const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

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

    const handleCreateTask = async () => {
        if (!newTitle) {
            alert('Title is required');
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
                title: newTitle,
                description: newDescription
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTasks([...tasks, response.data]);
            setNewTitle('');
            setNewDescription('');
            console.log(response.data);
        } catch (err) {
            alert('Failed to create task');
        }
    }
    
    const handleDeleteTask = async (id: number) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTasks(tasks.filter(task => task.id!== id));
            console.log('Deleted task', id);
        } catch (err) {
            alert('Failed to delete task');
        }
    }

    const handleEditTask = async (id: number, newTitle: string, newDescription: string, newCompleteStatus: boolean) => {
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`, {
                title: newTitle,
                description: newDescription,
                isComplete: newCompleteStatus
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTasks(tasks.map(task => task.id === id? {...task, title: newTitle, description: newDescription} : task));
            console.log('Updated task', id);
        } catch (err) {
            console.log('Failed to update task');
        }
    }

    const handleSignOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }


    return (
        <>
            <button onClick={handleSignOut}>Logout</button>
            <div className={styles.container}>
                <h1>Tasks</h1>
                <div className={styles.createTaskContainer}>
                    <input type="text" placeholder="Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
                    <textarea placeholder="Description" value={newDescription} onChange={e => setNewDescription(e.target.value)} />
                    <button onClick={handleCreateTask}>Create Task</button>
                </div>
                <div className={styles.titles}>
                    <h2>Status</h2>
                    <h2>Title</h2>
                    <h2>Description</h2>
                </div>
                {tasks.map((task: any) => (
                    <Task
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        isComplete={task.iscomplete}
                        onEdit={(id: number, newTitle: string, newDescription: string, newCompleteStatus: boolean) => handleEditTask(id, newTitle, newDescription, newCompleteStatus)}
                        onDelete={(id: number) => handleDeleteTask(id)}
                    />
                ))}
            </div>
        </>
    )
}

export default Tasks;