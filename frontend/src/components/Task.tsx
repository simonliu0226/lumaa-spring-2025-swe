import React, { useState } from 'react';
import { IoIosCheckmarkCircle, IoIosCheckmarkCircleOutline } from "react-icons/io";

interface TaskProps {
    id: number;
    title: string;
    description: string;
    isComplete: boolean;
    onEdit: (id: number, newTitle: string, newDescription: string) => void;
    onDelete: (id: number) => void;
    onToggleComplete: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ id, title, description, isComplete, onEdit, onDelete, onToggleComplete }) => {
    const [editMode, setEditMode] = useState(false);
    const [currTitle, setCurrTitle] = useState(title);
    const [currDescription, setCurrDescription] = useState(description);
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [complete, setComplete] = useState(isComplete);

    const handleToggle = () => {
        const newCompleteStatus = !complete;
        setComplete(newCompleteStatus);
        onToggleComplete(id);
    }

    const handleSave = () => {
        setCurrTitle(newTitle);
        setCurrDescription(newDescription);
        onEdit(id, newTitle, newDescription);
        setEditMode(false);
    }

    const handleEditMode = () => {
        setEditMode(true);
        setNewTitle(currTitle);
        setNewDescription(currDescription);
    }

    return (
        <div>
            {complete ? <button onClick={handleToggle}><IoIosCheckmarkCircle/></button> : <button onClick={handleToggle}><IoIosCheckmarkCircleOutline/></button>}
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
            {editMode ? <button onClick={() => setEditMode(false)}>Cancel</button> : <button onClick={handleEditMode}>Edit</button>}
            {editMode ? <button onClick={handleSave}>Save</button> : <button onClick={() => onDelete(id)}>Delete</button>}
        </div>
    );
};

export default Task;