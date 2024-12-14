import Item from './Item';

const List = ({ tasks, setTasks, setCounter, editTask, editTaskTitle, setEditTaskTitle, hours, minutes, seconds}) => {
  return (
    <ul>
      {tasks.map((task) => (
        <Item key={task.id} {...task} setTasks={setTasks} tasks={tasks} setCounter={setCounter} editTask={editTask} editTaskTitle={editTaskTitle} setEditTaskTitle={setEditTaskTitle} hours={hours} minutes={minutes} seconds={seconds}/>
      ))}
    </ul>
  );
};

export default List;
