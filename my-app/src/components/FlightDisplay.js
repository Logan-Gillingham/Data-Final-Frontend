import React, { useState, useEffect } from "react";
import "./FlightDisplay.css";

const FlightDisplay = () => {
    const [arrivals, setArrivals] = useState([]);
    const [departures, setDepartures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAirportCode] = useState("YYZ");

    useEffect(() => {
        const fetchFlights = async () => {
            setLoading(true);
            setError(null);
            try {
                const arrivalsResponse = await fetch(`http://localhost:8080/api/arrivals?airportCode=${selectedAirportCode}`);
                const departuresResponse = await fetch(`http://localhost:8080/api/departures?airportCode=${selectedAirportCode}`);

                if (!arrivalsResponse.ok || !departuresResponse.ok) {
                    throw new Error(`HTTP error! status: ${arrivalsResponse.status} / ${departuresResponse.status}`);
                }

                const arrivalsData = await arrivalsResponse.json();
                const departuresData = await departuresResponse.json();

                setArrivals(arrivalsData);
                setDepartures(departuresData);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        fetchFlights();
    }, [selectedAirportCode]); // Re-fetch when the airport code changes

    const allFlights = [...arrivals.map(flight => ({ ...flight, type: 'Arrival' })), ...departures.map(flight => ({ ...flight, type: 'Departure' }))];

    if (loading) {
        return <div>Loading flight data...</div>;
    }

    if (error) {
        return <div>Error fetching flight data: {error.message}</div>;
    }

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
                                <th>Type</th>
                                <th>Flight</th>
                                <th>Airline</th>
                                <th>Origin/Destination</th> {/* Adjust based on your API response */}
                                <th>Gate</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allFlights.map((flight) => (
                                <tr key={flight.id}>
                                    <td>{flight.type}</td>
                                    <td>{flight.flightNumber}</td>
                                    <td>{flight.airline && flight.airline.name ? flight.airline.name : 'N/A'}</td> {/* Added null check */}
                                    <td>{flight.airport && flight.airport.name ? flight.airport.name : 'N/A'}</td> {/* Added null check */}
                                    <td>{flight.gateNumber}</td> {/* Assuming gateNumber is directly on flight */}
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