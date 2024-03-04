import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FeedbackCard from "../../component/FeedbackCard";

test("FeedbackCard renders successfully for correct answer", () => {
  const mockProps = {
    result: true,
    feedback: "Well done!",
    display: true,
  };

  render(<FeedbackCard {...mockProps} />);

  const feedbackOut = screen.getByText("Well done!");
  expect(feedbackOut).toBeInTheDocument();
  const result = screen.getByText("Correct!");
  expect(result).toBeInTheDocument();
});

test("FeedbackCard renders successfully for wrong answer", () => {
    const mockProps = {
      result: false,
      feedback: "Try again!",
      display: true,
    };
  
    render(<FeedbackCard {...mockProps} />);
  
    const feedbackOut = screen.getByText("Try again!");
    expect(feedbackOut).toBeInTheDocument();
    const result = screen.getByText("Incorrect");
    expect(result).toBeInTheDocument();
  });