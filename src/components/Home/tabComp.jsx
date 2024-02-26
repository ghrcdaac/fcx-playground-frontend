import React from "react";
import { Tab, Tabs } from "@mui/material";
import { InputForm } from "../earthaccess/inputForm";
import { Status } from "../earthaccess/status";
import { GetFilePath } from "../earthaccess/filePath";
import { ShowMetaData } from "../earthaccess/metadata";
import { useEffect, useState } from "react";


export function TabComponent(){
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [jobid, setJobid] = useState('');

    const [jobStatus, setJobStatus] = useState([]);

    const [jobArrayState, setJobArrayState] = useState([]);
    const jobMap = new Map();
 
    const handleTabChange = (e, tabIndex) => {
      setCurrentTabIndex(tabIndex);
    };


    const socketUrl = "ws://127.0.0.1:8000/ws";

    //for cleanup function
    useEffect(() => {
        const socket = new WebSocket(socketUrl);
    
        // Connection opened, display error if conn closed
        socket.addEventListener("open", (event) => {
          console.log("Connection Open")
        })
    
        // Listen for messages
        socket.addEventListener("message", (event) => {
          const response = JSON.parse(event.data)
          const {uid, status} = response
          if (jobMap.has(uid)) {
            const statuses = jobMap.get(uid);
            statuses.push(status);
            jobMap.set(uid, statuses);
          } else {
            jobMap.set(uid, [status]);
          }

           // Convert the Map to an array of objects
        const jobArray = Array.from(jobMap.entries()).map(([uid, statuses]) => ({ uid, statuses }));

          setJobArrayState(jobArray);
          //console.log("Message from server ", status)
          setJobid(uid);
          setJobStatus((prev) => [...prev, status]);
        })
    
        return () => socket.close()
      }, [])

      const clearJobsHandler = () => {
        setJobArrayState([]);
        jobMap.clear();
    }
      console.log("job status: ", jobStatus)
    return (
        <React.Fragment>
        <Tabs value={currentTabIndex} onChange={handleTabChange}>
            <Tab label='Input form'/>
            <Tab label='Status' />
            <Tab label='File path' />
            <Tab label='Metadata' />
        </Tabs>
        {currentTabIndex === 0 && <InputForm getJobid={(jobid) => setJobid(jobid)}/>}
        {currentTabIndex === 1 && <Status tabIndex={currentTabIndex} jobObj={jobArrayState} clearJobs={clearJobsHandler}/>}
        {currentTabIndex === 2 && <GetFilePath tabIndex={currentTabIndex} jobid={jobid}/>}
        {currentTabIndex === 3 && <ShowMetaData tabIndex={currentTabIndex} jobid={jobid}/>}
        </React.Fragment>
    )
}