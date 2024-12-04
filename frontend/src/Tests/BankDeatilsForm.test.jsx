import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import BankDetailsForm from "../components/BankDetailsForm";
import { describe, expect, it } from "vitest";

const mockSubmit = () => {};
const mockBack = () => {};

const initialData = {
  bankname: "",
  branchname: "",
  ifsc: "",
  accNo: "",
};

describe("BankDetailsForm", () => {
  it("renders without errors", () => {
    render(
      <BankDetailsForm data={initialData} onSubmit={mockSubmit} onBack={mockBack} />
    );
  });

  it("displays error messages for required fields when submitting without data", async () => {
    const { getByText, getByTestId } = render(
      <BankDetailsForm data={initialData} onSubmit={mockSubmit} onBack={mockBack} />
    );

    const submitButton = getByTestId("submit-button");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText(/Bank Name is required/i).toBeInTheDocument)
      expect(screen.queryByText(/Branch Name is required/i).toBeInTheDocument)
      expect(screen.queryByText(/IFSC Number is required/i).toBeInTheDocument)
      expect(screen.queryByText(/Account Number is required/i).toBeInTheDocument)
    });
  });

  // it("calls onSubmit when all required fields are filled", async () => {
  //   const { getByTestId } = render(
  //     <BankDetailsForm data={initialData} onSubmit={mockSubmit} onBack={mockBack} />
  //   );

  //   const bankNameInput = getByTestId("bankname-input");
  //   const branchNameInput = getByTestId("branchname-input");
  //   const ifscInput = getByTestId("ifsc-input");
  //   const accNoInput = getByTestId("accNo-input");
  //   const submitButton = getByTestId("submit-button");

  //   fireEvent.change(bankNameInput, { target: { value: "Test Bank" } });
  //   fireEvent.change(branchNameInput, { target: { value: "Test Branch" } });
  //   fireEvent.change(ifscInput, { target: { value: "123456" } });
  //   fireEvent.change(accNoInput, { target: { value: "9876543210" } });
  //   fireEvent.click(submitButton);

  //   await waitFor(() => {
  //     expect(mockSubmit).toHaveBeenCalledWith({
  //       bankname: "Test Bank",
  //       branchname: "Test Branch",
  //       ifsc: "123456",
  //       accNo: "9876543210",
  //     });
  //   });
  // });

  // it("calls onBack when the Back button is clicked", () => {
  //   const { getByTestId } = render(
  //     <BankDetailsForm data={initialData} onSubmit={mockSubmit} onBack={mockBack} />
  //   );

  //   const backButton = getByTestId("back-button");

  //   fireEvent.click(backButton);

  //   expect(mockBack).toHaveBeenCalled();
  // });
});
