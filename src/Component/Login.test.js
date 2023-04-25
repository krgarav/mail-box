import { render, screen } from "@testing-library/react";
import Login from "./Login";
import "@testing-library/jest-dom/extend-expect";
describe("Login component", () => {
  test("Testing Login", () => {
    render(<Login />);
    const linkElement = screen.getByText("Email address");
    expect(linkElement).toBeInTheDocument();
  });
  test("Testing forgot your password", () => {
    render(<Login/>)
    const linkElement = screen.getByText("Forgot your password?");
    expect(linkElement).toBeInTheDocument();
  });
});
