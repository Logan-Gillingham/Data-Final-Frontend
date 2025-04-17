// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  MemoryRouter: ({ children }) => <div>{children}</div>,
  Route: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Link: ({ children }) => <div>{children}</div>
}));

import { render, screen } from "@testing-library/react";
import App from "./App";
import FlightDisplay from "./components/FlightDisplay";
import AdminPage from "./components/AdminPage";

describe("App Component Tests", () => {
  // Test 1: Navigation Links
  test("renders navigation links", () => {
    render(<App />);

    const flightDisplayLink = screen.getByText(/Flight Display/i);
    const adminPageLink = screen.getByText(/Admin Page/i);

    expect(flightDisplayLink).toBeInTheDocument();
    expect(adminPageLink).toBeInTheDocument();
  });

  // Test 2: Footer Content
  test("renders footer content", () => {
    render(<App />);

    const footerText = screen.getByText(
      /© 2025 Your Company. All rights reserved./i
    );
    expect(footerText).toBeInTheDocument();
  });

  // Test 3: Route Rendering - FlightDisplay
  test('renders FlightDisplay component on "/" route', () => {
    render(<FlightDisplay />);

    const flightDisplayHeading = screen.getByText(/Flight Display/i); // Replace with a unique text from FlightDisplay
    expect(flightDisplayHeading).toBeInTheDocument();
  });

  // Test 4: Route Rendering - AdminPage
  test('renders AdminPage component on "/admin" route', () => {
    render(<AdminPage />);

    const adminPageHeading = screen.getByText(/Admin Page/i); // Replace with a unique text from AdminPage
    expect(adminPageHeading).toBeInTheDocument();
  });

  // Test 5: Add Flight Form in AdminPage
  test("renders add flight form in AdminPage", () => {
    render(<AdminPage />);

    const flightNumberInput = screen.getByPlaceholderText(/Flight Number/i);
    const airlineInput = screen.getByPlaceholderText(/Airline/i);
    const addButton = screen.getByText(/Add Flight/i);

    expect(flightNumberInput).toBeInTheDocument();
    expect(airlineInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  // Test 6: Flight Table in FlightDisplay
  test("renders flight table in FlightDisplay", () => {
    render(<FlightDisplay />);

    const tableHeader = screen.getByText(/Flight Number/i); // Replace with a unique header text
    expect(tableHeader).toBeInTheDocument();
  });
});
