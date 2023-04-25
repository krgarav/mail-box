import { render, screen } from "@testing-library/react";
import { expect, jest, test } from "@jest/globals";
import Login from "./Login";
import {BrowserRouter} from "react-router-dom"
import "@testing-library/jest-dom/extend-expect";
describe("Login component", () => {
  test("Testing Login", () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    const linkElement = screen.getByText("Email address");
    expect(linkElement).toBeInTheDocument();
  });
  test("Testing forgot your password", () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    const linkElement = screen.getByText("Forgot your password?");
    expect(linkElement).toBeInTheDocument();
  });
  test("async testing", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async()=>[{idToken:"hgfhfhyu"}]
    })
    render(<BrowserRouter><Login /></BrowserRouter>);
    const elm = await screen.findAllByText("Welcome to Mailbox");
    expect(elm).toBeInTheDocument();
  });
});
