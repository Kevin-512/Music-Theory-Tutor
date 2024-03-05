import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Customiser from "../../component/Customiser";

jest.mock("mui-color-input");

test("Customiser renders successfully", () => {
  const mockProps = {
    color: "white",
    setColor: "",
    loggedEmail: "",
    fontSize: "",
    setFontSize: "",
    setWebTheme: "",
    webTheme: "",
  };

  render(<Customiser {...mockProps}/>);

  const titleElement = screen.getByText("Colour");
  expect(titleElement).toBeInTheDocument();
});
