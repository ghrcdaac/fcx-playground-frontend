import React from "react";

export function StatusCard(props) {

    return (
        <div>
            <ul>
                {props.status.map((path, index) => (
                    <p key={index}>{path}</p>
                ))}
            </ul>
        </div>
    );
}