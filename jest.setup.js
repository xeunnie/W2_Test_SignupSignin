jest.mock('next/server', () => ({
  Request: class {},
  Response: class {},
}));
