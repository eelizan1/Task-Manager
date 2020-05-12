import React, { createContext, useState } from "react";
import { v1 as uuid } from "uuid";

export const TaskListContext = createContext();

const TaskListContextProvider = (props) => {
  const [tasks, setTasks] = useState([
    { title: "Read the book", id: 1 },
    { title: "Wash the Car", id: 2 },
    { title: "Write code", id: 3 },
  ]);

  const [editItem, setEditItem] = useState(null);

  const addTask = (title) => {
    setTasks([...tasks, { title, id: uuid() }]);
  };

  // Remove tasks
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearList = (e) => {
    e.preventDefault();
    setTasks([]);
  };

  const findItem = (id) => {
    const item = tasks.find((item) => item.id === id);
    setEditItem(item);
  };

  const editTask = (title, id) => {
    const newTask = tasks.map((task) =>
      task.id === id ? { title, id } : task
    );

    setTasks(newTask);
    setEditItem(null);
  };

  return (
    <TaskListContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        clearList,
        findItem,
        editTask,
        editItem,
      }}
    >
      {props.children}
    </TaskListContext.Provider>
  );
};

export default TaskListContextProvider;
