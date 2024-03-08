import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Quiz from "../../pages/Quiz";

test("Quiz renders successfully", () => {
  
    render(<MemoryRouter>
        <Quiz />
      </MemoryRouter>);
  
    const title = screen.getByText("Quizzes");
    expect(title).toBeInTheDocument();
  });