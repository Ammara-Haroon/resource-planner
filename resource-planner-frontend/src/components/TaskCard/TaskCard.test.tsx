import { getByPlaceholderText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TaskCard from "./TaskCard";
import { TaskPartial } from "../../services/api-responses_interfaces";
import React from "react";

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

describe("Task Card Tests", () => {
  it("Should call handleDelete delete button is clicked", async () => {
    const testMode = "add";

    const mockHandleEdit = vi.fn(
      (id: number, updatesToTask: TaskPartial): void => {}
    );
    const mockHandleOverwrite = vi.fn(
      (id: number, updatesToTask: TaskPartial): void => {}
    );
    const mockHandleDelete = vi.fn((id: number): void => {});

    render(
      <TaskCard
        task={testTask}
        handleEdit={mockHandleEdit}
        handleOverwrite={mockHandleOverwrite}
        handleDelete={mockHandleDelete}
      />
    );

    const deleteBtn = screen.getByTestId("deleteBtn");
    const user = userEvent.setup();
    await user.click(deleteBtn);
    expect(mockHandleDelete).toBeCalled();
  });

  it("Should open edit form edit button is clicked", async () => {
    const testMode = "add";

    const mockHandleEdit = vi.fn(
      (id: number, updatesToTask: TaskPartial): void => {}
    );
    const mockHandleOverwrite = vi.fn(
      (id: number, updatesToTask: TaskPartial): void => {}
    );
    const mockHandleDelete = vi.fn((id: number): void => {});

    render(
      <TaskCard
        task={testTask}
        handleEdit={mockHandleEdit}
        handleOverwrite={mockHandleOverwrite}
        handleDelete={mockHandleDelete}
      />
    );

    const editBtn = screen.getByTestId("editBtn");
    const user = userEvent.setup();
    await user.click(editBtn);
    const editForm = screen.getByTestId("editForm");
    expect(editForm).toBeInTheDocument();
  });
});
