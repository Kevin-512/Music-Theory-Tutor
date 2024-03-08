import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import NoteRecognitionPane from "../../pages/NoteRecognitionPane";

test("NoteRecognitionPane renders successfully", () => {
  
    render(<MemoryRouter>
        <NoteRecognitionPane />
      </MemoryRouter>);
  
    const button = screen.getByText("Results");
    expect(button).toBeInTheDocument();
    
  });