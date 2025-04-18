import React, { useState, useEffect } from "react";
import "./AdminPage.css";

const AdminPage = () => {
    const [newFlightNumber, setNewFlightNumber] = useState("");
    const [newAirportId, setNewAirportId] = useState("");
    const [newGateId, setNewGateId] = useState("");
    const [newAircraftId, setNewAircraftId] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [arrivals, setArrivals] = useState([]); // State to hold fetched arrivals

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleAddArrivalSubmit = async (e) => {
        e.preventDefault();

        const newArrivalData = {
            flightNumber: newFlightNumber,
            // Wrap IDs in objects as expected by the backend entity relationships
            airport: { id: parseInt(newAirportId) },
            gate: { id: parseInt(newGateId) },
            status: newStatus,
            aircraft: { id: parseInt(newAircraftId) },
        };

        try {
            const response = await fetch("http://localhost:8080/api/arrivals", {
                method: "POST", // Send a POST request to create a new arrival
                headers: {
                    "Content-Type": "application/json", // Indicate that the request body is JSON
                },
                body: JSON.stringify(newArrivalData), // Send the new arrival data as a JSON string
            });

            if (response.ok) {
                console.log("Arrival added successfully!");
                const savedArrival = await response.json(); // Parse the saved arrival object returned by the backend
                setArrivals([...arrivals, savedArrival]); // Add the new arrival to the local state to update the table

                // Reset the form fields after successful submission
                setNewFlightNumber("");
                setNewAirportId("");
                setNewGateId("");
                setNewAircraftId("");
                setNewStatus("");

            } else {
                console.error("Failed to add arrival:", response.status);
                const errorData = await response.json();
                console.error("Error details:", errorData);
            }
        } catch (error) {
            console.error("There was an error adding the arrival:", error);
        }
    };

    // Handler for updating arrival status directly from the table
    const handleArrivalStatusChange = async (id, newStatus) => {
        const updatedArrivalData = {
            id: id, // Include the ID for the update request
            status: newStatus,
            // Note: This PUT only sends ID and status.
            // A more complete PUT would send all fields of the arrival.
            // The backend update method also expects related entities,
            // so sending only status here might cause issues if not handled properly backend-side.
            // For a minimal update, you might need a dedicated PATCH endpoint or send the full object.
            // Assuming the backend update logic can handle partial updates based on the ID and provided fields.
        };

        try {
            const response = await fetch(`http://localhost:8080/api/arrivals/${id}`, {
                method: "PUT", // Use PUT method to update an existing resource
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedArrivalData), // Send the updated data
            });

            if (response.ok) {
                console.log(`Arrival ${id} status updated to ${newStatus}`);
                const updatedArrival = await response.json(); // Get the updated arrival from the backend
                // Update the local state to reflect the status change in the table
                setArrivals(arrivals.map(a => a.id === id ? { ...a, status: updatedArrival.status } : a));

            } else {
                console.error(`Failed to update arrival ${id} status:`, response.status);
                const errorData = await response.json();
                console.error("Error details:", errorData);
            }
        } catch (error) {
            console.error(`There was an error updating arrival ${id} status:`, error);
        }
    };

    // useEffect hook to fetch arrivals when the component mounts
    useEffect(() => {
        const fetchArrivals = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/arrivals"); // GET request to fetch all arrivals
                if (!response.ok) {
                    throw new Error(`Failed to fetch arrivals: ${response.status}`);
                }
                const data = await response.json(); // Parse the JSON response
                setArrivals(data); // Update the state with the fetched data
            } catch (error) {
                console.error("Error fetching arrivals:", error);
                // Optionally set an error state to display a message to the user
            }
        };

        fetchArrivals(); // Call the fetch function
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div className="admin-page">
            <h1>Admin Page</h1>

            {/* Add Arrival Form */}
            <form className="add-flight-form" onSubmit={handleAddArrivalSubmit}>
                <h2>Add New Arrival</h2>
                <input
                    type="text"
                    placeholder="Flight Number"
                    value={newFlightNumber}
                    onChange={(e) => handleInputChange(e, setNewFlightNumber)}
                />
                <input
                    type="text"
                    placeholder="Arrival Airport ID"
                    value={newAirportId}
                    onChange={(e) => handleInputChange(e, setNewAirportId)}
                />
                <input
                    type="text"
                    placeholder="Gate ID"
                    value={newGateId}
                    onChange={(e) => handleInputChange(e, setNewGateId)}
                />
                <input
                    type="text"
                    placeholder="Aircraft ID"
                    value={newAircraftId}
                    onChange={(e) => handleInputChange(e, setNewAircraftId)}
                />
                <select value={newStatus} onChange={(e) => handleInputChange(e, setNewStatus)}>
                    <option value="">Select Status</option>
                    <option value="On Time">On Time</option>
                    <option value="Delayed">Delayed</option>
                    <option value="Arrived">Arrived</option>
                </select>
                <button type="submit">Add Arrival</button>
            </form>

            {/* Arrivals Table - Displays data fetched from the backend */}
            <table className="flights-table">
                <thead>
                    <tr>
                        <th>Flight Number</th>
                        <th>Arrival Airport ID</th>
                        <th>Gate ID</th>
                        <th>Aircraft ID</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map over the 'arrivals' state to render each arrival as a table row */}
                    {arrivals.map((arrival) => (
                        <tr key={arrival.id}> {/* Unique key is important for list rendering */}
                            <td>{arrival.flightNumber}</td>
                            {/* Use optional chaining (?) in case the related entity is null */}
                            <td>{arrival.airport?.id || 'N/A'}</td>
                            <td>{arrival.gate?.id || 'N/A'}</td>
                            <td>{arrival.aircraft?.id || 'N/A'}</td>
                            <td>
                                {/* Select dropdown to change status, triggers update API call */}
                                <select
                                    value={arrival.status}
                                    onChange={(e) => handleArrivalStatusChange(arrival.id, e.target.value)}
                                >
                                    <option value="On Time">On Time</option>
                                    <option value="Delayed">Delayed</option>
                                    <option value="Arrived">Arrived</option>
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