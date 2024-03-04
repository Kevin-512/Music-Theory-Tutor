import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginCard from "../../component/LoginCard";

test("LoginCard renders successfully", () => {
  
    render(<LoginCard />);
  
    const formTitle = screen.getByText("Sign in");
    expect(formTitle).toBeInTheDocument();
    const email = screen.getByText("Email Address");
    expect(email).toBeInTheDocument();
    const password = screen.getByText("Password");
    expect(password).toBeInTheDocument();
  });