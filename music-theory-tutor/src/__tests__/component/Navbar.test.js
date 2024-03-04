import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../../component/Navbar";

test("Navbar renders successfully", () => {
  
    render(<Navbar/>);
  
    const title = screen.getByText("MUSIC THEORY TUTOR");
    expect(title).toBeInTheDocument();
  });
  