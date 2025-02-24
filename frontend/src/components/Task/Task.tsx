import React, { useState } from 'react';
import { IoIosCheckmarkCircle, IoIosCheckmarkCircleOutline } from "react-icons/io";
import styles from './Task.module.css';

interface TaskProps {
    id: number;
    title: string;
    description: string;
    isComplete: boolean;
    onEdit: (id: number, newTitle: string, newDescription: string, newCompleteStatus: boolean) => void;
    onDelete: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ id, title, description, isComplete, onEdit, onDelete }) => {
    const [editMode, setEditMode] = useState(false);
    const [currTitle, setCurrTitle] = useState(title);
    const [currDescription, setCurrDescription] = useState(description);
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [complete, setComplete] = useState(isComplete);

    const handleToggle = () => {
        const newCompleteStatus = !complete;
        setComplete(newCompleteStatus);
        onEdit(id, currTitle, currDescription, newCompleteStatus);
    }

    const handleSave = () => {
        setCurrTitle(newTitle);
        setCurrDescription(newDescription);
        onEdit(id, newTitle, newDescription, complete);
        setEditMode(false);
    }

    const handleEditMode = () => {
        setEditMode(true);
        setNewTitle(currTitle);
        setNewDescription(currDescription);
    }

    return (
        <div className={styles.container}>
            {complete ? <button className={styles.button} onClick={handleToggle}><IoIosCheckmarkCircle size={40}/></button> : <button className={styles.button} onClick={handleToggle}><IoIosCheckmarkCircleOutline size={40}/></button>}
            {editMode ? (
                <>
                    <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
                    <textarea value={newDescription} onChange={e => setNewDescription(e.target.value)} />
                </>
            ) : (
                <>
                    <h3>{currTitle}</h3>
                    <p>{currDescription}</p>
                </>
            )}
            {editMode ? <button className={styles.button} onClick={() => setEditMode(false)}>Cancel</button> : <button className={styles.button} onClick={handleEditMode}>Edit</button>}
            {editMode ? <button className={styles.button} onClick={handleSave}>Save</button> : <button className={styles.button} onClick={() => onDelete(id)}>Delete</button>}
        </div>
    );
};

export default Task;