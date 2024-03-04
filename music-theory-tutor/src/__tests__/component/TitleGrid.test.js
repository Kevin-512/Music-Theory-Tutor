import { render, screen } from "@testing-library/react";
import TitleGrid from "../../component/TitleGrid";
import "@testing-library/jest-dom";

test("TitleGrid renders successfully", () => {
  const mockProps = {
    color: "white",
    image: "test.jpg",
    imageText: "Test Image",
    title: "Home",
    description: "Welcome to home page",
  };

  render(<TitleGrid {...mockProps} />);

  const titleElement = screen.getByText("Home");
  expect(titleElement).toBeInTheDocument();
  const descriptionElement = screen.getByText("Welcome to home page");
  expect(descriptionElement).toBeInTheDocument();
});
