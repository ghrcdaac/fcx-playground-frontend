import React from "react";


export default function MetaDataCard(props) {
    console.log(props.metadata)
    return (
        <div>
        {props.metadata && Object.entries(props.metadata).map(([key, value]) => (
        <div key={key}>
          <h3>{key}</h3>
          <ul>
            {Object.entries(value).map(([subKey, subValue]) => (
              <p key={subKey}>
                <strong>{subKey}: </strong>
                {JSON.stringify(subValue)}
              </p>
            ))}
          </ul>
        </div>
      ))}
        </div>
    )
}