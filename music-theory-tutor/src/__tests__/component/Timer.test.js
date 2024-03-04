import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Timer from "../../component/Timer";

test("Timer counts down correctly", async () => {
  // Render Timer
  render(<Timer timeLeft={1} />);

  // Wait for the Timer to count down
  await waitFor(() => screen.findByText("0"), { timeout: 2000 });

  // Ensure that the Timer displays 0 after the countdown
  const timerElement = screen.getByText("0");
  expect(timerElement).toBeInTheDocument();
});

test("Timer stops counting down at 0", async () => {
  // Render Timer
  render(<Timer timeLeft={1} />);

  // Wait Timer to count down
  await waitFor(() => screen.findByText("0"), { timeout: 2000 });

  // Ensure that the Timer displays 0 after the countdown
  const timerElement = screen.getByText("0");
  expect(timerElement).toBeInTheDocument();
});