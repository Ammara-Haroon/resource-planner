import { getByPlaceholderText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Tabs from "./Tabs";
import {
  CategoriesContext,
  ICategoriesContext,
} from "../../context/CategoriesContext";
import { Category } from "../../services/api-responses_interfaces";
import React from "react";

const testCategories: Category[] = [
  {
    id: 6,
    name: "Home",
    icon: "/src/assets/home-icon.png",
  },
  {
    id: 3,
    name: "Office",
    icon: "/src/assets/briefcase-icon.png",
  },
  {
    id: 9,
    name: "Shopping",
    icon: "/src/assets/basket-icon.png",
  },
  {
    id: 8,
    name: "Urgent",
    icon: "/src/assets/siren-icon.png",
  },
];

describe("Tabs Tests", () => {
  it("Should call display all categories correctly and All tab", async () => {
    const testCatgeory = undefined;
    const mockHandleClick = (category: number) => {};
    const mockContextVal: ICategoriesContext = {
      categories: testCategories,
      error: null,
    };
    render(
      <CategoriesContext.Provider value={mockContextVal}>
        <Tabs selectedCategory={testCatgeory} handleClick={mockHandleClick} />
      </CategoriesContext.Provider>
    );

    testCategories.forEach((cat) => {
      const categoryTab = screen.getByAltText(cat.name);
      expect(categoryTab).toBeInTheDocument();
    });
  });

  it("Should call handlClick function when any category is clicked", async () => {
    const testCatgeory = undefined;
    const mockHandleClick = (category: number) => {};
    render(
      <Tabs selectedCategory={testCatgeory} handleClick={mockHandleClick} />
    );
    const btns = screen.getAllByRole("tab");
    const user = userEvent.setup();
    btns.forEach(async (btn) => {
      await user.click(btn);
      expect(mockHandleClick).toBeCalled();
    });
  });
});
