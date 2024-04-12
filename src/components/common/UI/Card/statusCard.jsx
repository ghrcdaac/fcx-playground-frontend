import React, { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function StatusCard(props) {
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (props.status.at(-1) === "Job completed") {
            setIsLoading(false);
        }
    }, [props.status]);

    return (
        <div>
            <ul>
                {props.status.map((data, i) => (
                    <p key={i}>{data}</p>
                ))}
            </ul>
            {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center' }} pl={5}>
                <CircularProgress />
            </Box>}
        </div>
    );
    
}