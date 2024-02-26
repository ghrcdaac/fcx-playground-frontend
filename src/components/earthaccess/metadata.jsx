import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { MyCard } from "./UI/Card/Card";
// import { MetaDataCard } from "./UI/Card/metaDataCard";

// const MyCard = lazy(() => import("./UI/Card/Card"));

export function ShowMetaData(props) {
    const [metadata, setMetadata] = useState(null);
    const metadataRef = useRef(null);

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
                // metadataRef.current = data;
                console.log(metadataRef.current)
            } catch (error) {
                console.error('Error:', error.message);
            }
        };
        fetchMetaData();
    }, [props.jobid]);

    return (
        <div>
            {/* <Suspense fallback={<div>Loading...</div>}>
            {MyCard && <MyCard tabIndex={props.tabIndex} id={props.jobid} cardContent={metadata} />}
            </Suspense> */}
            <MyCard tabIndex={props.tabIndex} id={props.jobid} cardContent={metadata} />
            {/* {metadataRef.current && <MetaDataCard metadata={metadataRef.current} />} */}
        </div>
    )
}