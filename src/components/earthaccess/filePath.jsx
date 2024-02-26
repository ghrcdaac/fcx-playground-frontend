import React from "react";
import { useState, useEffect } from "react";
import { MyCard } from "./UI/Card/Card";

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
            console.log(data, typeof(data));
            setFilePath(data);
          } catch (error) {
            console.error('Error:', error.message);
          }
        };
        
        fetchJobStatus();
        console.log(filePath);
      }, [props.jobid]);

    return (
        <div>
         <MyCard tabIndex={props.tabIndex} id={props.jobid} cardContent={filePath} />
        </div>
    )
}