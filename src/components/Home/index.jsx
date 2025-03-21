import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { TopBar } from './topBar';
import { FCXViewer } from '../cesiumViewer';
import { ClippedDrawer } from './drawer';
import webSocketHandler from './websocket';

function Home() {
  const visualizationTypes = ['czml', '3dTile', 'wmts', 'pointPrimitive', 'subsettingTool', 'histogramTool', 'earthaccess', 'pangeoforge']
  const [selectedVisualization, setVisualization] = React.useState(visualizationTypes[0]);

  webSocketHandler();

  return (
    <Box className="heightFix" sx={{ display: 'flex' }}>
    <CssBaseline />
      <TopBar/>
      <ClippedDrawer visualizationTypes={visualizationTypes} setVisualization={setVisualization}/>
      <FCXViewer selectedVisualization={selectedVisualization}/>
    </Box>
  );
}
export default Home;