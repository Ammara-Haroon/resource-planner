import {
  getByPlaceholderText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TaskForm from "./TaskForm";
import { wait } from "@testing-library/user-event/dist/cjs/utils/index.js";
import React from "react";

describe("Task Form Tests", () => {
  it("Should display edit task when in edit mode", async () => {
    const testMode = "edit";
    const testTask = null;

    const mockCloseForm = vi.fn(() => {});
    const mockSaveTask = vi.fn((data: FormData) => {});

    render(
      <TaskForm
        mode={testMode}
        task={testTask}
        closeForm={mockCloseForm}
        saveTask={mockSaveTask}
      />
    );

    expect(screen.getByText(/edit task/i)).toBeInTheDocument();
  });

  it("Should display add task when in edit mode", async () => {
    const testMode = "add";
    const testTask = null;

    const mockCloseForm = vi.fn(() => {});
    const mockSaveTask = vi.fn((data: FormData) => {});

    render(
      <TaskForm
        mode={testMode}
        task={testTask}
        closeForm={mockCloseForm}
        saveTask={mockSaveTask}
      />
    );

    expect(screen.getByText(/add task/i)).toBeInTheDocument();
  });

  it("Should call closeForm function the form when back button is clicked in add mode", async () => {
    const testMode = "add";
    const testTask = null;

    const mockCloseForm = vi.fn(() => {});
    const mockSaveTask = vi.fn((data: FormData) => {});

    render(
      <TaskForm
        mode={testMode}
        task={testTask}
        closeForm={mockCloseForm}
        saveTask={mockSaveTask}
      />
    );

    const backBtn = screen.getByTestId("backBtn");
    const user = userEvent.setup();
    await user.click(backBtn);
    expect(mockCloseForm).toBeCalled();
    expect(mockSaveTask).not.toBeCalled();
  });

  it("Should call closeForm function the form when back button is clicked in edit mode", async () => {
    const testMode = "edit";
    const testTask = null;

    const mockCloseForm = vi.fn(() => {});
    const mockSaveTask = vi.fn((data: FormData) => {});

    render(
      <TaskForm
        mode={testMode}
        task={testTask}
        closeForm={mockCloseForm}
        saveTask={mockSaveTask}
      />
    );

    const backBtn = screen.getByTestId("backBtn");
    const user = userEvent.setup();
    await user.click(backBtn);
    expect(mockCloseForm).toBeCalled();
    expect(mockSaveTask).not.toBeCalled();
  });

  it("Should call saveTask function the form when save button is clicked in edit mode", async () => {
    const testMode = "edit";
    const testTask = null;

    const mockCloseForm = vi.fn(() => {});
    const mockSaveTask = vi.fn((data: FormData) => {});

    render(
      <TaskForm
        mode={testMode}
        task={testTask}
        closeForm={mockCloseForm}
        saveTask={mockSaveTask}
      />
    );

    const saveBtn = screen.getByTestId("saveBtn");
    expect(saveBtn).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(saveBtn);
    expect(mockCloseForm).not.toBeCalled();

    waitFor(() => expect(mockSaveTask).toBeCalled());
  });

  it("Should call saveTask function the form when save button is clicked in add mode", async () => {
    const testMode = "add";
    const testTask = null;

    const mockCloseForm = vi.fn(() => {});
    const mockSaveTask = vi.fn((data: FormData) => {});

    render(
      <TaskForm
        mode={testMode}
        task={testTask}
        closeForm={mockCloseForm}
        saveTask={mockSaveTask}
      />
    );

    const saveBtn = screen.getByTestId("saveBtn");
    expect(saveBtn).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(saveBtn);
    expect(mockCloseForm).not.toBeCalled();

    waitFor(() => expect(mockSaveTask).toBeCalled());
  });

  it("Should display task data correctly in edit mode", async () => {
    const testMode = "edit";
    const testTask = {
      id: 69,
      description: "Buy Milk",
      isCompleted: true,
      updatedAt: "2024-05-30T04:28:48.556+00:00",
      createdAt: "2024-05-30T02:04:16.088+00:00",
      dueDate: new Date("2024-06-01T14:00:00.000+00:00"),
      category: {
        id: 9,
        name: "Shopping",
        icon: "/src/assets/basket-icon.png",
      },
    };

    const mockCloseForm = vi.fn(() => {});
    const mockSaveTask = vi.fn((data: FormData) => {});

    render(
      <TaskForm
        mode={testMode}
        task={testTask}
        closeForm={mockCloseForm}
        saveTask={mockSaveTask}
      />
    );

    expect(screen.getByText(testTask.description)).toBeInTheDocument();
  });
});
