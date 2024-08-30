import React, { useState, useEffect } from 'react';

export function DoorSensor(props) {
  const [endpointData, setEndpointData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkEndpoint = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5000/input/${props.sensor}`);
      const data = await response.json();
      setEndpointData(JSON.stringify(data, null, 2));
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(checkEndpoint, 1000); // Check every second

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
        <pre>{endpointData.sensor} is set to {endpointData.state}</pre>
      )}
    </div>
  );
}