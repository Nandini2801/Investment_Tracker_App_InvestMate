import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { describe, expect, it } from "vitest";

describe("LoginForm", () => {
  it("renders the login form", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    expect(screen.queryByPlaceholderText(/Email/i).toBeInTheDocument)
    expect(screen.queryByPlaceholderText(/Password/i).toBeInTheDocument)

  });

  it("validates the form fields", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.queryByText(/Email is required/i).toBeInTheDocument);
      expect(screen.queryByText(/Password is required/i).toBeInTheDocument);
    });
  });

  it("handles form submission", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("Login");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(loginButton);

  });
});
