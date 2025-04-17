import React, { useState } from "react";
import "./AdminPage.css";

const AdminPage = () => {
  const [flights, setFlights] = useState([
    {
      id: 1,
      flightNumber: "AA123",
      airline: "American Airlines",
      originDestination: "New York (JFK)",
      gate: "A12",
      status: "On Time"
    },
    {
      id: 2,
      flightNumber: "DL456",
      airline: "Delta Airlines",
      originDestination: "Los Angeles (LAX)",
      gate: "B5",
      status: "Delayed"
    },
    {
      id: 3,
      flightNumber: "UA789",
      airline: "United Airlines",
      originDestination: "Chicago (ORD)",
      gate: "C3",
      status: "Boarding"
    }
  ]);

  const handleUpdateStatus = (id, newStatus) => {
    setFlights((prevFlights) =>
      prevFlights.map((flight) =>
        flight.id === id ? { ...flight, status: newStatus } : flight
      )
    );
  };

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      <table>
        <thead>
          <tr>
            <th>Flight</th>
            <th>Airline</th>
            <th>Origin/Destination</th>
            <th>Gate</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.flightNumber}</td>
              <td>{flight.airline}</td>
              <td>{flight.originDestination}</td>
              <td>{flight.gate}</td>
              <td>{flight.status}</td>
              <td>
                <button
                  onClick={() => handleUpdateStatus(flight.id, "On Time")}
                >
                  On Time
                </button>
                <button
                  onClick={() => handleUpdateStatus(flight.id, "Delayed")}
                >
                  Delayed
                </button>
                <button
                  onClick={() => handleUpdateStatus(flight.id, "Cancelled")}
                >
                  Cancelled
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
