import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import QuizCard from "../../component/QuizCard";

jest.mock('axios');
jest.mock('vexflow');

test("QuizCard loads correctly", () => {
  const mockProps = {
    quizId: 1,
    quizScale: "C",
    quizTitle: "C Major"
  };

  render(<QuizCard {...mockProps}/>);

  const quizTitle = screen.getByText("C Major");
  expect(quizTitle).toBeInTheDocument();

});
