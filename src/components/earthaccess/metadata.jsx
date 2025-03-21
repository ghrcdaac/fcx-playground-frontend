import React, { useState, useEffect } from "react";
import { MyCard } from "../common/UI/Card/Card";
import { refreshStatus } from "../common/utils/statusUtils";
import { useSelector } from "react-redux";
import * as Constants from "../common/utils/Constants";

// display metadata for one of the result files(earthaccess)
export function ShowMetaData(props) {
    const jobStatusUpdate = useSelector((state) => props.jobType === Constants.type_earthaccess? state.statusUpdate.eaStatusUpdate : state.statusUpdate.pfStatusUpdate);
    const [savedJobs, setSavedJobs] = useState([]);

    // listening for new jobs triggered
    useEffect(() => {
      refreshStatus(setSavedJobs, props.jobType);
      }, [jobStatusUpdate]);

    return (
        <div>
          {savedJobs.map((job) => (
              <MyCard tabIndex={props.tabIndex} key={job.uid} timestamp={job.timestamp} id={job.uid} shortName={job.shortName}/>
          ))}
        </div>
    )
}