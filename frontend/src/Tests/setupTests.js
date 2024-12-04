// import { jest } from "@jest/globals";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { vi } from "vitest";
// import "jest-canvas-mock";

afterEach(() => {
  cleanup();
});

HTMLCanvasElement.prototype.getContext = () => {
  return {
    fillStyle: "",
    fillRect: vi.fn(),
  };
};
