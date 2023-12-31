import { CzmlDataSource, HeadingPitchRange, Math, HeadingPitchRoll,
         Transforms, CallbackProperty, Cartesian3 } from 'cesium';

import { DataViewer } from '../utils/dataViewer';

export function initializeCZMLViewer(setCurrentViewer) {
    /**
     * Initialize viewer and load CZML type data.
     * @param  {function} setCurrentViewer  A function that takes `viewer` as a parameter. Used to keep track of current viewer for later removal in parent scope.
     */
    const czmlViewer = new CZMLViewer();
    setCurrentViewer(czmlViewer.viewer);
    const czmlDataUrl = "https://ghrc-fcx-field-campaigns-szg.s3.amazonaws.com/Olympex/instrument-processed-data/nav_er2/olympex_naver2_IWG1_20151109.czml"
    czmlViewer.loadDataIntoViewer(czmlDataUrl);
}

class CZMLViewer extends DataViewer {
    loadDataIntoViewer(czmlDataUrl) {
        CzmlDataSource.load(czmlDataUrl)
        .then(async (dataSource) => {
            this.viewer.dataSources.add(dataSource);
            // zoom to entity
            this.viewer.zoomTo(dataSource,  new HeadingPitchRange(0, Math.toRadians(-10), 40000));

            // only apply to czml for flight entities
            const flightEntity = dataSource.entities.getById("Flight Track");
            if (flightEntity) {
                flightEntity.viewFrom = new Cartesian3(-30000, -70000, 50000);
                // track entity
                this.viewer.trackedEntity = flightEntity;
                // fix orientation
                flightEntity.orientation = new CallbackProperty((time, _result) => fixOrientation(flightEntity, time), false);

                function fixOrientation(entity, time) {
                    const position = entity.position.getValue(time);
                    let { heading, pitch, roll, correctionOffsets } = entity.properties.getValue(time);
                    // only the heading should change with respect to the position.
                    if(!correctionOffsets) {
                        correctionOffsets = {
                            heading: 0,
                            pitch: 0,
                            roll: 0
                        }
                    }
                    // fix the pitch and roll rotations
                    heading = heading + Math.toRadians(correctionOffsets.heading);
                    pitch = pitch + Math.toRadians(correctionOffsets.pitch);
                    roll = roll + Math.toRadians(correctionOffsets.roll);
                    const hpr = new HeadingPitchRoll(heading, pitch, roll);
                    const fixedOrientation = Transforms.headingPitchRollQuaternion(
                        position,
                        hpr
                    );
                    return fixedOrientation;
                }
            }
        });
    }
}