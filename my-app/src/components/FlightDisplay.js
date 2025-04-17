import React, { useState } from "react";
import "./FlightDisplay.css";

const FlightDisplay = () => {
  const mockFlights = [
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
  ];

  const [flights] = useState(mockFlights);

  return (
    <>
      {/* Main Content */}
      <div className="flight-display-container">
        <div className="flight-display">
          {/* Arrivals and Departures in a White Box */}
          <div className="white-box">Arrivals and Departures</div>
          <table>
            <thead>
              <tr>
                <th>Flight</th>
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
                  <td>{flight.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flight-display-footer">
            <p>Powered by Your Flight Tracker</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightDisplay;
