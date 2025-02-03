import "@testing-library/jest-dom";

jest.mock('next/server', () => ({
  Request: class {},
  Response: class {},
}));
