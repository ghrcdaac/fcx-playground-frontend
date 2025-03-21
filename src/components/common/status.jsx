import React, { useState, useEffect } from "react";
import { MyCard } from "./UI/Card/Card";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useSelector } from "react-redux";
import * as Constants from "./utils/Constants";
import { refreshStatus } from "./utils/statusUtils";

// display received status updates for jobs
export function ShowStatus(props) {

  const jobStatusUpdate = useSelector((state) => props.jobType == Constants.type_earthaccess ? state.statusUpdate.eaStatusUpdate : state.statusUpdate.pfStatusUpdate);
  const [savedJobs, setSavedJobs] = useState([]);
  var selectedJobs = [];

  // clear selected jobs from local storage
  const clearJobsHandler = () => {
    selectedJobs.map((id) => (
      localStorage.removeItem(id)
    ));
    selectedJobs = [];
    refreshStatus(setSavedJobs, props.jobType);
  }

  // list of selected jobs(id) to be cleared on button click
  const selectedJobsToClear = (id) => {
    if (selectedJobs.includes(id)) {
      selectedJobs = selectedJobs.filter(item => item !== id);
    } else {
      selectedJobs.push(id);
    }
  }

  // refresh the list of saved jobs when jobStatusUpdate changes
  useEffect(() => {
    refreshStatus(setSavedJobs, props.jobType)
  }, [jobStatusUpdate]);

  // job statuses are fetched from local storage and passed to Card component
  return (
    <div>
      {savedJobs.length > 0 && savedJobs.map((job) => (
        <MyCard key={job.uid} tabIndex={props.tabIndex} id={job.uid} timestamp={job.timestamp} shortName={job.shortName} cardContent={job.statuses} onCheck={selectedJobsToClear} />
      ))}
      <Box textAlign='center' padding={5}>
        <Button onClick={clearJobsHandler} type="submit" variant='contained' color="error" sx={{ position: "fixed", top: 80, right: 20, zIndex: 2000 }}>Clear</Button>
      </Box>
    </div>
  );

}