import { render, screen } from "@testing-library/react";
import { expect, jest, test } from "@jest/globals";
import Inbox from "./Inbox";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import Store from "../../Store/index";
describe("Login component", () => {
  test("Testing Login", () => {
    render(
      <BrowserRouter>
        <Provider store={Store}>
          <Inbox />
        </Provider>
      </BrowserRouter>
    );
    const linkElement = screen.getByText("Compose");
    expect(linkElement).toBeInTheDocument();
  });
});
