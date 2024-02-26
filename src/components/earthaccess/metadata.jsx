import React, { useState, useEffect } from "react";
import { MyCard } from "./UI/Card/Card";

export function ShowMetaData(props) {
    const [metadata, setMetadata] = useState(null);

    useEffect(() => {
        const fetchMetaData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/get_metadata?uid=${props.jobid}`, {
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
                setMetadata(data);
                
            } catch (error) {
                console.error('Error:', error.message);
            }
        };
        fetchMetaData();
    }, [props.jobid]);

    return (
        <div>
            <MyCard tabIndex={props.tabIndex} id={props.jobid} cardContent={metadata} />
        </div>
    )
}