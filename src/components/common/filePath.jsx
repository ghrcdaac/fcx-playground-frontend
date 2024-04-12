import React from "react";
import { useState, useEffect } from "react";
import { MyCard } from "./UI/Card/Card";
import { refreshStatus } from "./utils/statusUtils";
import { useSelector } from "react-redux";
import * as Constants from "./utils/Constants";

// display location of files in S3
export function GetFilePath(props) {
  const jobStatusUpdate = useSelector((state) => props.jobType === Constants.type_earthaccess ? state.statusUpdate.eaStatusUpdate : state.statusUpdate.pfStatusUpdate);
  const [savedJobs, setSavedJobs] = useState([]);

  // listening for new jobs triggered
  useEffect(() => {
    refreshStatus(setSavedJobs, props.jobType);
  }, [jobStatusUpdate]);

  return (
    <div>
      {savedJobs.map((job) => (
        <MyCard tabIndex={props.tabIndex} key={job.uid} timestamp={job.timestamp} id={job.uid} shortName={job.shortName} />
      ))}
    </div>
  )
}