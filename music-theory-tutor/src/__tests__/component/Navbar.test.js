import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../../component/Navbar";
import { MemoryRouter } from "react-router-dom";

test("Navbar renders successfully", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  const title = screen.getByText("MUSIC THEORY TUTOR");
  expect(title).toBeInTheDocument();
});
