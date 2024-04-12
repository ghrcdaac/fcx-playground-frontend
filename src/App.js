import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import './App.css';
import Home from './components/Home';
import Sample from './sample';

const data = {
  "coords": {
    "lon": {"dims": ["lon"], "attrs": {"units": "degrees_east", "long_name": "Longitude"}, "dtype": "float32", "shape": [5784]},
    "lat": {"dims": ["lat"], "attrs": {"units": "degrees_north", "long_name": "Latitude"}, "dtype": "float64", "shape": [3484]},
    "time": {"dims": ["time"], "attrs": {"units": "days since 1970-01-01 00:00:00Z", "standard_name": "time", "calendar": "julian", "bounds": "time_bnds"}, "dtype": "float64", "shape": [3]}
  }
};

function App() {
  return (
    <React.Fragment className="App heightFix">
      <CssBaseline />
      <Home/>
      {/* <Sample data={data}/> */}
    </React.Fragment>
  );
}

export default App;
