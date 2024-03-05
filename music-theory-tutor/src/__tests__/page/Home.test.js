import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../../pages/Home";
import { MemoryRouter } from "react-router-dom";

test("Home renders successfully", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  const title = screen.getByText("Home");
  expect(title).toBeInTheDocument();
  const learn = screen.getByText("Learn");
  expect(learn).toBeInTheDocument();
  const quiz = screen.getByText("Quizzes");
  expect(quiz).toBeInTheDocument();
  const sightread = screen.getByText("Note Recognition");
  expect(sightread).toBeInTheDocument();
});
