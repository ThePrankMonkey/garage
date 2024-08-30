import React, { useState, useEffect } from "react";

function DoorSensor(props) {
  const [endpointData, setEndpointData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkEndpoint = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://192.168.86.64:5000/input/${props.sensor}`
      );
      const data = await response.json();
      console.log(data);
      console.log("Sensor:", data.sensor);
      console.log("State:", data.state);
      setEndpointData(data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(checkEndpoint, 5000); // Check every second

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Render component based on endpoint data, loading state, and error
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <pre>
          {endpointData.sensor} is set to {endpointData.state.toString()}
        </pre>
      )}
    </div>
  );
}

export default DoorSensor;
