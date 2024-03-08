import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegisterCard from "../../component/RegisterCard";

test("Register card renders correctly", async () => {
    // Render RegisterCard
    render(<RegisterCard />);
  
    // Check Signup exists
    const title = screen.getByText("Sign up")
    expect(title).toBeInTheDocument();
  });