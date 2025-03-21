import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";

// fetches file locations on clicking the card for a job and displays it
export function FilePathCard(props) {
  const [selectedPaths, setSelectedPaths] = useState([]);
  const [filePath, setFilePath] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const jobCompleted = useSelector((state) => state.statusUpdate.isJobComplete);

  useEffect(() => {
    if (!props.onExpand) {
      return;
    }

    const fetchJobStatus = async () => {
      try {
        const response = await fetch(`https://d18jyfeuf17gzw.cloudfront.net/get_file_path?uid=${props.jobid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setFilePath(data);
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
    };

    fetchJobStatus();

  }, [props.onExpand, jobCompleted]);
  // jobCompleted - if card is left expanded, "job in progress" should change to file paths automatically
  // using jobId for jobCompleted to uniquely show download completed for each job and update initialValue to ''

  const handleCheckboxChange = (path) => {
    if (selectedPaths.includes(path)) {
      setSelectedPaths(selectedPaths.filter(item => item !== path));
    } else {
      setSelectedPaths([...selectedPaths, path]);
    }
  };

  const selectAllHandler = () => {
    setSelectedPaths(filePath);
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(selectedPaths.join('\n'));
  };

  const handleDownload = () => {
    const content = selectedPaths.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'selected_filepaths.txt';
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  return (
    <div>
      {isLoading && <p><i>Loading...</i></p>}
      {error && <p>{error.message}</p>}
      {filePath && typeof (filePath) === 'string' ? (
        <p>{filePath}</p>
      ) : (
        <ul>
          {filePath.map((path, index) => (
            <div key={index}>
              <Checkbox
                checked={selectedPaths.includes(path)}
                onChange={() => handleCheckboxChange(path)}
              />
              <a href={path} target="_blank" rel="noopener noreferrer">{path}</a>
            </div>
          ))}
        </ul>)
      }
      <Stack spacing={2} direction="row" justifyContent="center">
        <Button onClick={selectAllHandler} color="primary" variant="contained">Select All</Button>
        <Button onClick={handleCopyToClipboard} color="primary" variant="contained">Copy to Clipboard</Button>
        <Button onClick={handleDownload} color="primary" variant="contained">Download Selected Paths</Button>
      </Stack>
    </div>
  )
}