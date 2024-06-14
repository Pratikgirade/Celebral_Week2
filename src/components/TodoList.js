import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('asc');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (taskInput.trim() === '') return;
        const newTask = { id: Date.now(), text: taskInput, completed: false };
        setTasks([...tasks, newTask]);
        setTaskInput('');
    };

    const removeTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const toggleTaskCompletion = (taskId) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sort === 'asc') return a.text.localeCompare(b.text);
        return b.text.localeCompare(a.text);
    });

    return (
        <div className="todo-list">
            <h1>To-Do List</h1>
            <input 
                type="text" 
                value={taskInput} 
                onChange={(e) => setTaskInput(e.target.value)} 
                placeholder="Add a new task" 
            />
            <button className="add" onClick={addTask}>Add Task</button>
            <div>
                <label>Filter: </label>
                <select onChange={handleFilterChange} value={filter}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>
                <label>Sort: </label>
                <select onChange={handleSortChange} value={sort}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <ul>
                {sortedTasks.map(task => (
                    <li key={task.id} className={task.completed ? 'completed' : ''}>
                        <span>{task.text}</span>
                        <div>
                            <button className="complete" onClick={() => toggleTaskCompletion(task.id)}>
                                {task.completed ? 'Undo' : 'Complete'}
                            </button>
                            <button className="remove" onClick={() => removeTask(task.id)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
