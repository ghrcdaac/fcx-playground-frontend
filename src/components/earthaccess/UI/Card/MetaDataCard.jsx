import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import JSONPretty from 'react-json-pretty';

// fetches metadata on clicking the card for a job and displays it
export default function MetaDataCard(props) {
  const [metadata, setMetadata] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const jobCompleted = useSelector((state) => state.statusUpdate.isJobComplete);

  useEffect(() => {
    if (!props.onExpand) {
      return;
    }

    const fetchMetaData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://d18jyfeuf17gzw.cloudfront.net/get_metadata?uid=${props.jobid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setIsLoading(false);
        setMetadata(data);
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
    };
    fetchMetaData();
  }, [props.onExpand, jobCompleted]);

  return (
    <div>
      {
      isLoading ? (
        <p><i>Loading...</i></p>  // Show only if isLoading is true
      ) : error ? (
        <p>{error.message}</p>  // Show error message if there's an error and not loading
      ) : metadata && typeof (metadata) === 'string' ? (
        <p>{metadata}</p>
      ) :
        metadata && Object.entries(metadata).map(([key, value]) => (
          <div key={key} align="left">
            <h3>{key}</h3>
            <ul>
              {Object.entries(value).map(([subKey, subValue]) => (
                <p key={subKey}>
                  <strong>{subKey}: </strong>
                  {JSON.stringify(subValue)}
                </p>
              ))}
            </ul>
          </div>))}
      {/* <JSONPretty id={props.jobid} data={metadata}/> */}
    </div>
  )
}