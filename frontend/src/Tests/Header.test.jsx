import { render, screen, fireEvent } from "@testing-library/react";
import HeaderLayout from "../components/HeaderLayout";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

describe("HeaderLayout", () => {
  it("renders the header", () => {
    render(
      <MemoryRouter>
        <HeaderLayout />
      </MemoryRouter>
    );
    
  });

  it("renders navigation links", () => {
    render(
      <MemoryRouter>
        <HeaderLayout />
      </MemoryRouter>
    );
    expect(screen.queryByText(/Dashboard/i).toBeInTheDocument)
    expect(screen.queryByText(/Portfolios/i).toBeInTheDocument)
    expect(screen.queryByText(/ESG Articles/i).toBeInTheDocument)
    expect(screen.queryByText(/Watchlists/i).toBeInTheDocument)
    expect(screen.queryByText(/Past Transactions/i).toBeInTheDocument)
    expect(screen.queryByText(/Stocks/i).toBeInTheDocument)

  });

  it("opens the sidebar when the menu button is clicked", () => {
    render(
      <MemoryRouter>
        <HeaderLayout />
      </MemoryRouter>
    );

    const menuButton = screen.queryByLabelText("Menu");
    fireEvent.click(menuButton);
  });

  it("displays the search input on larger screens", () => {
    render(
      <MemoryRouter>
        <HeaderLayout />
      </MemoryRouter>
    );

    expect(screen.queryAllByPlaceholderText(/Search for articles.../i).toBeInTheDocument)
    
  });

  it("displays the user avatar", () => {
    render(
      <MemoryRouter>
        <HeaderLayout />
      </MemoryRouter>
    );

    expect(screen.queryAllByTestId(/user-avatar/i).toBeInTheDocument)
  });
});
