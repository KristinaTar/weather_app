import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { renderWithProvider } from "./helpers/testHelpers";
import userEvent from "@testing-library/user-event";

describe("App tests", () => {
  beforeEach(() => {
    renderWithProvider(<App />);
  });

  test("Should App render", () => {
    const element = screen.queryByText(/Add/i);
    expect(element).toBeInTheDocument();
  });

  test("Should type in search input", () => {
    const inputElement = screen.getByTestId("searchInput").querySelector("input")!;
    userEvent.type(inputElement, "Milan");
    expect(inputElement).toHaveDisplayValue("Milan");
  });

  test("Should search city", async () => {
    const inputElement = screen.getByTestId("searchInput");
    userEvent.type(inputElement, "Milan");

    const button = screen.getByTestId("searchButton");
    userEvent.click(button);

    await waitFor(() => expect(screen.queryByText(/milan/i)).toBeInTheDocument(), {
      timeout: 2000,
    });
  });

  test("Should delete city", () => {
    const closeButton = screen.getByTestId("deleteButton-kyiv");
    userEvent.click(closeButton);

    const element = screen.queryByText(/kyiv/i);
    expect(element).toBeNull();
  });

  test("Should show detailed weather", async () => {
    const detailsButton = screen.getByTestId("moreDetails-kyiv");
    userEvent.click(detailsButton);

    await waitFor(() => expect(screen.findByTestId("detailsName")), { timeout: 2000 });
  });
});
