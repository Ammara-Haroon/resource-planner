import { Task, TaskPartial } from "../../services/api-responses_interfaces";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamationTriangle,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import TaskForm from "../TaskForm/TaskForm";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { fillTask } from "../../services/task-services";
dayjs.extend(relativeTime);

interface TaskCardProps {
  task: Task;
  handleEdit(id: number, updatesToTask: TaskPartial): void;
  handleOverwrite(id: number, updatesToTask: TaskPartial): void;
  handleDelete(id: number): void;
}
const TaskCard = ({
  task,
  handleEdit,
  handleDelete,
  handleOverwrite,
}: TaskCardProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const isOverDue =
    task.dueDate && !task.isCompleted && !dayjs().isBefore(task.dueDate);
  let descriptionStyleClass = "w-11/12 flex items-center px-2 text-lg";
  descriptionStyleClass += task.isCompleted
    ? " text-stone-400 line-through"
    : " text-rose-400";
  descriptionStyleClass += isOverDue
    ? " text-rose-600 italic"
    : " text-rose-500";
  let dueDateStyleClass =
    "resize-none w-11/12  px-2 text-sm overflow-hidden text-ellipsis ";
  dueDateStyleClass += isOverDue ? " text-red-600" : " text-rose-500";

  const handleIsCompleted = () => {
    handleEdit(task.id, { isCompleted: !isCompleted });
    setIsCompleted(!isCompleted);
  };
  const handleClick = () => {
    setIsEditMode(!isEditMode);
  };

  const updateTask = (data: FormData) => {
    const dataObj: TaskPartial = Object.fromEntries(data.entries());
    const updatedTask = fillTask(dataObj);
    handleOverwrite(task.id, updatedTask);
  };
  const closeForm = (): void => {
    setIsEditMode(false);
  };

  return (
    <>
      <div className="w-full h-max-screen flex justify-between p-2 border">
        <div className="flex items-start w-11/12">
          <input
            className="mt-2.5"
            type="checkbox"
            defaultChecked={task.isCompleted}
            onChange={handleIsCompleted}
          />
          <div className="w-full">
            <div className="px-1 flex justify-space items-center">
              {isOverDue && (
                <FontAwesomeIcon
                  className="text-rose-700"
                  icon={faExclamationTriangle}
                />
              )}
              <div className={descriptionStyleClass}>
                <p className="text-ellipsis overflow-hidden max-w-11/12">
                  {task.description}
                </p>
                {task.category && (
                  <img
                    className="inline px-5 w-15 h-5 box-border"
                    src={task.category.icon}
                    alt={task.category.name}
                  />
                )}
              </div>
            </div>
            {task.dueDate && !task.isCompleted && (
              <p className={dueDateStyleClass}>
                Due {dayjs(task.dueDate).fromNow()}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end items-center">
          <button
            className="p-1 hover:shadow-lg border rounded  border-transparent hover:border-rose-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            data-testid="editBtn"
            onClick={handleClick}
          >
            {isEditMode ? (
              <FontAwesomeIcon icon={faCheck} size="lg" />
            ) : (
              <FontAwesomeIcon icon={faPencil} size="lg" />
            )}
          </button>
          <button
            className="p-1 hover:shadow-lg border rounded  border-transparent hover:border-rose-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            data-testid="deleteBtn"
            onClick={() => handleDelete(task.id)}
          >
            <FontAwesomeIcon icon={faTrash} size="lg" />
          </button>
        </div>
      </div>
      {isEditMode && (
        <TaskForm
          mode={"edit"}
          task={task}
          closeForm={closeForm}
          saveTask={updateTask}
        />
      )}
    </>
  );
};

export default TaskCard;
