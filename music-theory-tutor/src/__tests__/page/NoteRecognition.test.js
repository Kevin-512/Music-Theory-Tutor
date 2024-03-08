import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import NoteRecognition from "../../pages/NoteRecognition";

test("NoteRecognition renders successfully", () => {
  
    render(<MemoryRouter>
        <NoteRecognition />
      </MemoryRouter>);
  
    const title = screen.getByText("Note Reading");
    expect(title).toBeInTheDocument();
  });