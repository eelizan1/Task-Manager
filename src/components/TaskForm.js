import React, { useContext, useState, useEffect } from "react";
import { TaskListContext } from "../context/TaskListContext";

const TaskForm = () => {
  // grab add task function from the context 'store'
  const { addTask, clearList, editItem, editTask, setEditItem } = useContext(
    TaskListContext
  );
  const [title, setTitle] = useState("");

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  // prevent the default action of submitting the form
  const handleSubmit = (event) => {
    event.preventDefault();

    if (editItem === null) {
      addTask(title);
      setTitle("");
    } else {
      editTask(title, editItem.id);
    }
  };

  useEffect(() => {
    if (editItem != null) {
      setTitle(editItem.title);
    } else {
      setTitle("");
    }
  }, [editItem]);

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        className="task-input"
        placeholder="Add Task"
        required
        onChange={handleChange}
        value={title}
      />

      <div className="buttons">
        <button type="submit" className="btn add-task-btn">
          {editItem ? "Edit Task" : "Add Task"}
        </button>
        <button onClick={(e) => clearList(e)} className="btn clear-btn">
          Clear
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
