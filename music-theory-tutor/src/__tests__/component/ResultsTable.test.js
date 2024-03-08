import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResultsTable from "../../component/ResultsTable";

test("ResultsTable renders successfully", () => {
  
    render(<ResultsTable />);
  
    const quizLabel = screen.getByText("Quiz Type");
    expect(quizLabel).toBeInTheDocument();
    const keysigLabel = screen.getByText("Key Signature");
    expect(keysigLabel).toBeInTheDocument();
    const scoreLabel = screen.getByText("Score");
    expect(scoreLabel).toBeInTheDocument();
    const timeLabel = screen.getByText("Time");
    expect(timeLabel).toBeInTheDocument();
  });