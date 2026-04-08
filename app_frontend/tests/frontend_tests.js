import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "../src/components/Dashboard";

test("Dashboard renders items from backend", async () => {
  global.fetch = jest.fn(async () => ({
    ok: true,
    status: 200,
    json: async () => ({ items: [{ name: "Item1" }, { name: "Item2" }] }),
  }));

  render(<Dashboard />);

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  expect(await screen.findByText("Item1")).toBeInTheDocument();
  expect(await screen.findByText("Item2")).toBeInTheDocument();
});

