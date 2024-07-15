import { Task, TaskPartial } from "../../services/api-responses_interfaces";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FormEvent, useState } from "react";
import { useCategoriesContext } from "../../context/CategoriesContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  faArrowLeft,
  faCalendar,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { registerLocale } from "react-datepicker";
import { enAU } from "date-fns/locale/en-AU";
registerLocale("en-AU", enAU);
dayjs.extend(relativeTime);

interface TaskFormProps {
  mode: string;
  task: Task | TaskPartial | null;
  closeForm(): void;
  saveTask(data: FormData): void;
}

const TaskForm = ({ mode, task, closeForm, saveTask }: TaskFormProps) => {
  const { categories } = useCategoriesContext();
  const [isCompleted, setIsCompleted] = useState(task?.isCompleted);
  const [dueDate, setDueDate] = useState<Date | null>(task?.dueDate ?? null);
  let descriptionStyleClass =
    "resize-none w-11/12 text-ellipsis px-2 text-lg text-rose-400 text-ellipsis";
  descriptionStyleClass += isCompleted ? " line-through" : "";

  const handleIsCompleted = () => {
    setIsCompleted(!isCompleted);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    saveTask(new FormData(event.currentTarget));
  };
  return (
    <div
      data-testid="editForm"
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-hidden">
        <div className="flex h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform  rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-stone-50 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h2 className="font-bold text-rose-600" id="modal-title">
                    {mode === "edit" ? "Edit task" : "Add task"}
                  </h2>
                  <div className="mt-2">
                    <form
                      onSubmit={handleSubmit}
                      className="flex-column items-start w-full"
                    >
                      <div className="p-5 w-full flex">
                        {mode === "edit" && (
                          <input
                            className="m-2 self-start"
                            type="checkbox"
                            name="isCompleted"
                            id="isCompleted"
                            defaultChecked={task?.isCompleted}
                            onChange={handleIsCompleted}
                          />
                        )}
                        <textarea
                          required
                          placeholder="new task ..."
                          className={descriptionStyleClass}
                          name="description"
                          id="description"
                          data-testid="textArea"
                          defaultValue={task?.description}
                        />
                      </div>
                      <div>
                        <label
                          className="text-sm font-semibold text-rose-600"
                          htmlFor="category"
                        >
                          Select category:{" "}
                        </label>
                        <select
                          className="text-rose-500 text-sm"
                          defaultValue={task?.category?.id}
                          name="category"
                          id="category"
                        >
                          <option value="null">Default</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="py-2 flex flex-space">
                        {!dueDate && (
                          <button
                            className="inline-flex w-full justify-space rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-700  sm:w-auto bg-rose-500"
                            onClick={() => setDueDate(new Date())}
                          >
                            <p>Add Due Date</p>
                            <FontAwesomeIcon
                              className="px-2"
                              icon={faCalendar}
                            />
                          </button>
                        )}
                        {dueDate && (
                          <>
                            <DatePicker
                              className="inline-flex w-full justify-space rounded-md  px-3 py-2 text-sm font-semibold sm:w-auto text-rose-500 mr-2"
                              name="dueDate"
                              id="dueDate"
                              selected={dueDate}
                              dateFormat="dd/MM/yyyy"
                              locale="en-AU"
                              onChange={(date: Date) =>
                                date >= new Date()
                                  ? setDueDate(date)
                                  : setDueDate(new Date())
                              }
                            />
                            <button
                              className="text-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-700  sm:w-auto bg-rose-500"
                              onClick={() => setDueDate(null)}
                            >
                              <FontAwesomeIcon
                                className="px-2"
                                icon={faXmark}
                              />
                            </button>
                          </>
                        )}
                      </div>

                      {mode === "edit" && (
                        <div className="py-5">
                          <p className="pt-2 text-sm text-slate-500">
                            Created At:{" "}
                            {dayjs(task?.createdAt).format(
                              "HH:MM A DD/MM/YYYY"
                            )}
                          </p>
                          <p className="text-sm text-slate-500">
                            Last Updated:{" "}
                            {dayjs(task?.updatedAt).format(
                              "HH:MM A DD/MM/YYYY"
                            )}
                          </p>
                        </div>
                      )}
                      <div className="py-3 sm:flex sm:flex-row justify-between ">
                        <button
                          data-testid="backBtn"
                          onClick={closeForm}
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-rose-500 sm:mt-0 sm:w-auto"
                        >
                          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                        </button>
                        <button
                          data-testid="saveBtn"
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-700 sm:ml-3 sm:w-auto bg-rose-500"
                        >
                          <FontAwesomeIcon icon={faCheck} size="lg" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
