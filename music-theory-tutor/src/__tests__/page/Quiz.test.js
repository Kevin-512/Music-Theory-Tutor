import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Quiz from "../../pages/Quiz";
import { MemoryRouter } from "react-router-dom";

test("Quiz renders successfully", () => {
  
    render(<MemoryRouter>
        <Quiz />
      </MemoryRouter>);
  });