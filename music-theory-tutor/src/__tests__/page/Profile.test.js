import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Profile from "../../pages/Profile";
import { MemoryRouter } from "react-router-dom";

test("Profile renders successfully", () => {
    const mockProps = {
        userName: "admin",
        loggedEmail: "admin@example.com",
    }

    render(
      <MemoryRouter>
        <Profile {...mockProps}/>
      </MemoryRouter>
    );
  
    const title = screen.getByText("Profile");
    expect(title).toBeInTheDocument();
    const email = screen.getByText("Email:");
    expect(email).toBeInTheDocument();
    const userName = screen.getByText("Welcome back ");
    expect(userName).toBeInTheDocument();
    const historyTitle = screen.getByText("History");
    expect(historyTitle).toBeInTheDocument();
  });
  