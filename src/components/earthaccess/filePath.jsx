import React from "react";
import { useState, useEffect } from "react";

export function GetFilePath(props) {

    const [filePath, setFilePath] = useState([]);

    useEffect(() => {
        const fetchJobStatus = async () => {
          try {
            const response = await fetch(`http://localhost:8000/get_file_path?uid=${props.jobid}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data);
            setFilePath(data);
          } catch (error) {
            console.error('Error:', error.message);
          }
        };
    
        // Call the fetchJobStatus function only when props.jobid changes
        fetchJobStatus();
        console.log(filePath);
      }, [props.jobid]);

    return (
        <div>
            {filePath.length > 0 ? (
        <ul>
          {filePath.map((path, index) => (
            <li key={index}>{path}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
        </div>
    )
}