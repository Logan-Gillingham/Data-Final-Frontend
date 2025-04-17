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
    }
  ]);

  // Function to handle status change
  const handleStatusChange = (id, newStatus) => {
    const updatedFlights = flights.map((flight) =>
      flight.id === id ? { ...flight, status: newStatus } : flight
    );
    setFlights(updatedFlights);
  };

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>

      {/* Add Flight Form */}
      <form className="add-flight-form">
        <h2>Add New Flight</h2>
        <input type="text" placeholder="Flight Number" />
        <input type="text" placeholder="Airline" />
        <input type="text" placeholder="Origin/Destination" />
        <input type="text" placeholder="Gate" />
        <select>
          <option value="">Select Status</option>
          <option value="On Time">On Time</option>
          <option value="Delayed">Delayed</option>
          <option value="Boarding">Boarding</option>
        </select>
        <button type="submit">Add Flight</button>
      </form>

      {/* Flights Table */}
      <table className="flights-table">
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Airline</th>
            <th>Origin/Destination</th>
            <th>Gate</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.flightNumber}</td>
              <td>{flight.airline}</td>
              <td>{flight.originDestination}</td>
              <td>{flight.gate}</td>
              <td>
                <select
                  value={flight.status}
                  onChange={(e) =>
                    handleStatusChange(flight.id, e.target.value)
                  }
                >
                  <option value="On Time">On Time</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Boarding">Boarding</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
