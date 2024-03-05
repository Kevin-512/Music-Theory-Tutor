import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("App initialises variables correctly", () => {
  render(<App/>);

  expect(screen.getByText('authenticated: false')).toBeInTheDocument();
  expect("userID: 0").toBeInTheDocument();
});
