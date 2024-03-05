import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import History from "../../pages/History";
import { MemoryRouter } from "react-router-dom";

test("History renders successfully", () => {
  render(
    <MemoryRouter>
      <History />
    </MemoryRouter>
  );

  const title = screen.getByText("Login");
  expect(title).toBeInTheDocument();
  const linkText = screen.getByText("to view your history");
  expect(linkText).toBeInTheDocument();
});
