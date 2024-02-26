import React from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, colors } from "@mui/material";

export function FilePathCard(props) {
    console.log("In FilePathCard")

    // Function to handle copy to clipboard
    const copyToClipboardHandler = (path) => {
      navigator.clipboard.writeText(path)
        .then(() => {
          console.log('Link copied to clipboard');
        })
        .catch((err) => {
          console.error('Unable to copy to clipboard', err);
        });
    };
  
    return (
        <div>
            {typeof (props.paths) === 'string' ? (
            <p>{props.paths}</p>
          ) : (
            <ul>
                {props.paths.map((path, index) => (
                    <p key={index}>
                    <Button onClick={() => copyToClipboardHandler(path)}>
                        <ContentCopyIcon style={{color: "black",  fontSize: "20px"}}/>
                    </Button>
                    <a href={path} target="_blank" rel="noopener noreferrer">{path}</a>
                    </p>
                ))}
            </ul>)
            }
        </div>
    )
}