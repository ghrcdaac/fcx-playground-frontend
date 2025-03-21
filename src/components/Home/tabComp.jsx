import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { InputForm } from "../common/inputForm";
import { ShowStatus } from "../common/status";
import { GetFilePath } from "../common/filePath";
import { ShowMetaData } from "../earthaccess/metadata";
import * as Constants from "../common/utils/Constants";

// handles tabs in earthaccess and pangeo forge
export function TabComponent(props) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [jobid, setJobid] = useState('');

  const handleTabChange = (e, tabIndex) => {
    setCurrentTabIndex(tabIndex);
  };

  return (
    <React.Fragment>
      <Tabs value={currentTabIndex} onChange={handleTabChange}>
        <Tab label='Input form' />
        <Tab label='Status' />
        <Tab label='File path' />
        {/* render metadata for earthaccess only */}
        {props.jobType === Constants.type_earthaccess && <Tab label='Metadata' />}
      </Tabs>
      {currentTabIndex === 0 && <InputForm jobType={props.jobType} getJobid={(jobid) => setJobid(jobid)} selectTab={setCurrentTabIndex} />}
      {currentTabIndex === 1 && <ShowStatus jobType={props.jobType} tabIndex={currentTabIndex}/>}
      {currentTabIndex === 2 && <GetFilePath jobType={props.jobType} tabIndex={currentTabIndex} />}
      {currentTabIndex === 3 && <ShowMetaData jobType={props.jobType} tabIndex={currentTabIndex} />}
    </React.Fragment>
  )
}