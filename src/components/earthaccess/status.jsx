import React from "react";
import { MyCard } from "./UI/Card/Card";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export function ShowStatus(props) {

    const jobMap = props.jobObj

    const clearAllHandler = (event) => {
        event.preventDefault();
        props.clearJobs();
    }

   
    return (
        <div>
          {jobMap.length > 0 && jobMap.map(({ uid, statuses }) => (
              <MyCard tabIndex={props.tabIndex} id={uid} cardContent={statuses} />
            ))}
            <Box textAlign='center' padding={5}>
            <Button onClick={clearAllHandler} type="submit" variant='contained'>Clear All</Button>
            </Box>
        </div>
      );
    
}