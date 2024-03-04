import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import App from "../../App";

test("App initialises variables correctly", () => {
  render(<App/>);

  expect("Authenticated: No").toBeInTheDocument();
  expect("Authenticated: No").toBeInTheDocument();
});
