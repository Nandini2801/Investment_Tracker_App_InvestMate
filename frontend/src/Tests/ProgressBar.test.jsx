import { render , screen} from "@testing-library/react";
import Progressbar from "../components/ProgressBar";
import { describe, expect, it } from "vitest";

describe("Progressbar", () => {
  it("renders without errors", () => {
    render(<Progressbar completed={50} step={1} />);
  });

  it("displays the completed percentage correctly", () => {
    render(<Progressbar completed={75} step={2} />)
    expect(screen.queryByTestId(/filler/i).toBeInTheDocument)
  });

  it("displays the step information correctly", () => {
    render(<Progressbar completed={25} step={3} />);
    expect(screen.queryByText(/3 Completed/i).toBeInTheDocument)
  });
});
