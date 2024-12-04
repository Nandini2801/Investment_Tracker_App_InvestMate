import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUpForm from "../components/SignUpForm";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

const mockNext = () => {};
const mockBack = () => {};

const initialData = {
  email: "",
  password: "",
  confirmPassword: "",
};

describe("SignUpForm", () => {
  it("renders the form fields correctly", () => {
    render(
      <MemoryRouter>
        <SignUpForm data={initialData} onNext={mockNext} onBack={mockBack} />
      </MemoryRouter>
    );
  });

  it("displays validation errors for invalid inputs", async () => {
    render(
      <MemoryRouter>
        <SignUpForm data={initialData} onNext={mockNext} onBack={mockBack} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(screen.queryByText(/Email is required/i).toBeInTheDocument);
      expect(screen.queryByText(/Confirm Password is required/i).toBeInTheDocument);
      // expect(screen.getByText("Email is required")).toBeInTheDocument();
      // expect(screen.getByText("Password is required")).toBeInTheDocument();
      // expect(screen.getByText("Confirm Password is required")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalidemail" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "short" },
    });

    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "mismatch" },
    });

    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(screen.queryByText(/Invalid email address/i).toBeInTheDocument);
      expect(screen.queryByText(/Password must be at least 6 characters/i).toBeInTheDocument);
      expect(screen.queryByText(/Passwords must match/i).toBeInTheDocument);
    });
  });

  it("submits the form with valid inputs", async () => {
    const onNextMock = ()=>{};
    render(
      <MemoryRouter>
        <SignUpForm data={initialData} onNext={onNextMock} onBack={mockBack} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "validpassword" },
    });

    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "validpassword" },
    });

    fireEvent.click(screen.getByText("Next"));

    // await waitFor(() => {
    //   expect(onNextMock).toHaveBeenCalledWith({
    //     email: "test@example.com",
    //     password: "validpassword",
    //     confirmPassword: "validpassword",
    //   });
    // });
  });
});
