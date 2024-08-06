export function handleFileUpload(files, setBoundaryCoordinates){

    let reader = new FileReader();
      reader.onload = function(e) {
          const result = JSON.parse(reader.result);
          const { features } = result;

        // Extract boundary coordinates from the GeoJSON file
        const coordinates = features.reduce((acc, feature) => {
            feature.geometry.coordinates.forEach(coordinate => {
                const [x, y] = coordinate;
                acc.push({ x, y });
            });
            return acc;
        }, []);

        // Update boundaryCoordinates state with the extracted coordinates
        setBoundaryCoordinates({
            Xmin: Math.min(...coordinates.map(coord => coord.x)),
            Ymin: Math.min(...coordinates.map(coord => coord.y)),
            Xmax: Math.max(...coordinates.map(coord => coord.x)),
            Ymax: Math.max(...coordinates.map(coord => coord.y))
        });
    };
    reader.readAsText(files[0]);
}