import React, {lazy, Suspense} from "react";


const data = {
    "coords": {
      "lon": {"dims": ["lon"], "attrs": {"units": "degrees_east", "long_name": "Longitude"}, "dtype": "float32", "shape": [5784]},
      "lat": {"dims": ["lat"], "attrs": {"units": "degrees_north", "long_name": "Latitude"}, "dtype": "float64", "shape": [3484]},
      "time": {"dims": ["time"], "attrs": {"units": "days since 1970-01-01 00:00:00Z", "standard_name": "time", "calendar": "julian", "bounds": "time_bnds"}, "dtype": "float64", "shape": [3]}
    }
  };

export default function MetaDataCard(props) {
    console.log(props.metadata)
    return (
        <div>
            {/* {typeof (props.metadata) === 'string' ? (
            <p>{props.metadata}</p>
          ) : (
            <ul>
            {props.metadata.map(data => (
                <p key={data}>
                {data}
                </p>
            ))}
            </ul>)
            } */}
            {/* {props.metadata && (
                    <ul>
                        {Object.keys(props.metadata.coords).map(([key, value]) => (
                            <p key={key}>
                                <strong>{key}:</strong> {value}
                            </p>
                        ))}
                    </ul>
            )} */}
            {/* {props.metadata && Object.keys(props.metadata.coords).map(key => {
                    <div key={key}>
                        <h3>{key}</h3>
                        <ul>
                            {Object.entries(props.metadata.coords[key]).map(([subKey, subValue]) => (
                                <li key={subKey}>
                                    <strong>{subKey}:</strong> {JSON.stringify(subValue)}
                                </li>
                            ))}
                        </ul>
                    </div>
            })} */}
        {Object.entries(props.metadata).map(([key, value]) => (
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