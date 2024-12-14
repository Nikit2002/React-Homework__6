import { useRef } from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Item = ({ id, title, status, setTasks, tasks, addTime, setCounter, editTaskTitle, setEditTaskTitle, hours, minutes, seconds}) => {
  const [checked, setChecked] = useState(status);
  const classes = ['todo'];
  const checkbox = useRef();
  const editField = useRef();
  const editFieldInput = useRef();

  if (checked) {
    classes.push('status');
  }

  const updateStatus = () => {
    setChecked(!checked);
    setTasks((prev) => {
      let newArr = [...prev];
      newArr.map((el) => {
        if (el.id === id) {
          el.status = !checked;
        }
      });
      return newArr;
    });
    setCounter(prev => checkbox.current.checked? prev - 1 : prev + 1);
  };

  const removeTask = () => {
    setTasks(tasks.filter((el) => el.id !== id));
    setCounter(prev => prev - 1);
  };

  const displayEditField = () => {
    editField.current.classList.toggle('none');
  };

  const editTask = (e) => {
    if (e.key === 'Enter' && editTaskTitle) {
      setTasks([
        ...tasks.filter((el) => el.id !== id),
        {
          id: uuidv4(),
          title: editTaskTitle,
          status: false,
          addTime: `${hours}:${minutes}:${seconds}`
        },
      ]);
      setEditTaskTitle('');
    }
  };

  return (
    <>
    <li className={classes.join(' ')}>
      <label>
        <input type="checkbox" ref={checkbox} checked={checked} onChange={updateStatus} />
        <span>{title}</span>
        <span style={{paddingLeft: "20px"}}>{addTime}</span>
      </label>
      <button onClick={displayEditField}>Edit</button>
      <i className="material-icons red-text" onClick={removeTask}>
        X
      </i>
    </li>
    <div className="edit-field none" ref={editField}>
    <input ref={editFieldInput}
      type="text"
      value={editTaskTitle}
      onChange={(e) => setEditTaskTitle(e.target.value)}
      onKeyDown={editTask}
    />
    <label className={editTaskTitle && 'none'}>Task name</label>
  </div>
  </>
  );
};

export default Item;
