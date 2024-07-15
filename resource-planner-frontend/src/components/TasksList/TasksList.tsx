import TaskCard from "../TaskCard/TaskCard";
import {
  deleteTask,
  overwriteTask,
  updateTask,
} from "../../services/task-services";
import { useEffect, useState } from "react";
import { Task, TaskPartial } from "../../services/api-responses_interfaces";
import ErrMsg from "../ErrMsg/ErrMsg";

interface TasksListProps {
  taskList: Task[];
}

const TasksList = ({ taskList }: TasksListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTasks(taskList);
  }, [taskList]);

  const handleEdit = (id: number, updatesToTask: TaskPartial) => {
    const index = tasks.findIndex((tsk) => tsk.id == id);
    Object.assign(tasks[index], updatesToTask);
    try {
      updateTask(id, updatesToTask);
    } catch (e: any) {
      setError(e.message);
    }
  };
  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    try {
      deleteTask(id);
    } catch (e: any) {
      setError(e.message);
    }
  };
  const handleOverwrite = (id: number, updatesToTask: TaskPartial) => {
    const index = tasks.findIndex((tsk) => tsk.id == id);
    Object.assign(tasks[index], updatesToTask);
    try {
      overwriteTask(id, updatesToTask);
    } catch (e: any) {
      setError(e.message);
    }
  };
  return (
    <>
      {error && <ErrMsg msg={error} closeMsg={() => setError(null)} />}
      <div className="w-full border border-rose-300 overflow-y-auto ">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleOverwrite={handleOverwrite}
          />
        ))}
        {tasks.length === 0 && (
          <p className="m-2 text-slate-500 text-sm text-center">
            No tasks here
          </p>
        )}
      </div>
    </>
  );
};

export default TasksList;
