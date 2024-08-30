import React, { useState, useEffect } from "react";

function RelayButton(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://192.168.86.64:5000/output/blink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props.data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      // Handle successful response
      console.log("Success:", data);
    } catch (error) {
      setError(error);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button disabled={isLoading} onClick={handleSubmit}>
      {isLoading ? "Sending..." : "Send"}
    </button>
  );
}

export default RelayButton;
