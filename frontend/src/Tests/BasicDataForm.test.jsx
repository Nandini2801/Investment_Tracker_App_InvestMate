import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import BasicDataForm from "../components/BasicDataForm";
import { describe, expect, it } from "vitest";

const mockNext = () => {};
const mockBack = () => {};

const initialData = {
  fname: "",
  lname: "",
  dob: "",
  phone: "",
  gender: "",
};

describe("BasicDataForm", () => {
  it("renders without errors", () => {
    render(
      <BasicDataForm data={initialData} onNext={mockNext} onBack={mockBack} />
    );
  });

  it("displays error messages for required fields when submitting without data", async () => {
    const { getByText, getByTestId } = render(
      <BasicDataForm data={initialData} onNext={mockNext} onBack={mockBack} />
    );

    const nextButton = getByTestId("next-button");

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.queryByText(/First Name is required/i).toBeInTheDocument)
      expect(screen.queryByText(/Last Name is required/i).toBeInTheDocument)
      expect(screen.queryByText(/Date of Birth is required/i).toBeInTheDocument)
      expect(screen.queryByText(/Mobile Number is required/i).toBeInTheDocument)
    });
  });

  // it("calls onNext when all required fields are filled", async () => {
  //   const { getByTestId } = render(
  //     <BasicDataForm data={initialData} onNext={mockNext} onBack={mockBack} />
  //   );

  //   const firstNameInput = getByTestId("fname-input");
  //   const lastNameInput = getByTestId("lname-input");
  //   const dateOfBirthInput = getByTestId("dateOfBirth-input");
  //   const phoneInput = getByTestId("phone-input");
  //   const genderSelect = getByTestId("gender-select");
  //   const nextButton = getByTestId("next-button");

  //   fireEvent.change(firstNameInput, { target: { value: "John" } });
  //   fireEvent.change(lastNameInput, { target: { value: "Doe" } });
  //   fireEvent.change(dateOfBirthInput, { target: { value: "1990-01-01" } });
  //   fireEvent.change(phoneInput, { target: { value: "1234567890" } });
  //   fireEvent.change(genderSelect, { target: { value: "Male" } });
  //   fireEvent.click(nextButton);

  //   await waitFor(() => {
  //     expect(mockNext).toHaveBeenCalledWith({
  //       fname: "John",
  //       lname: "Doe",
  //       dateOfBirth: "1990-01-01",
  //       phone: "1234567890",
  //       gender: "Male",
  //     });
  //   });
  // });

  // it("calls onBack when the Back button is clicked", () => {
  //   const { getByTestId } = render(
  //     <BasicDataForm data={initialData} onNext={mockNext} onBack={mockBack} />
  //   );

  //   const backButton = getByTestId("back-button");

  //   fireEvent.click(backButton);

  //   expect(mockBack).toHaveBeenCalled();
  // });
});
