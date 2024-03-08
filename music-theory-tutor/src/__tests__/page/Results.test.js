import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Results from "../../pages/Results";

test("Results renders successfully", () => {
  
    render(<MemoryRouter>
        <Results />
      </MemoryRouter>);
  
    const button = screen.getByText("Return");
    expect(button).toBeInTheDocument();
  });