import { useEffect, useState } from 'react';
import List from './components/List';
import { v4 as uuidv4 } from 'uuid';
import {date} from './components/CurrentDate';
import CurrentDate from './components/CurrentDate';

function App() {
  const [tasks, setTasks] = useState(() =>
    !localStorage.getItem('tasks') ? [] : JSON.parse(localStorage.getItem('tasks')),
  );
  const [taskTitle, setTaskTitle] = useState('');
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const [counter, setCounter] = useState(() =>
  !localStorage.getItem('tasks') ? 0 : JSON.parse(localStorage.getItem('counter')),);


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('counter', JSON.stringify(counter));
  }, [tasks]);

  const addTask = (e) => {
    if (e.key === 'Enter' && taskTitle) {
      setTasks([
        ...tasks,
        {
          id: uuidv4(),
          title: taskTitle,
          status: false,
          addTime: `${hours}:${minutes}:${seconds}`
        },
      ]);
      setTaskTitle('');
      setCounter(prev => prev + 1);
    }
  };

  return (
    <div className="container">
      <h1>Note your task</h1>
      <CurrentDate />
      <h2>Unfinished tasks: {counter}</h2>
      <div className="input-field">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          onKeyDown={addTask}
        />
        <label className={taskTitle && 'none'}>Task name</label>
      </div>
      <List tasks={tasks} setTasks={setTasks} setCounter={setCounter} taskTitle={taskTitle} setTaskTitle={setTaskTitle} editTaskTitle={editTaskTitle} setEditTaskTitle={setEditTaskTitle} hours={hours} minutes={minutes} seconds={seconds}/>
    </div>
  );
}

export default App;
