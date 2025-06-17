import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
    // Load AnyChart scripts dynamically
    const baseScript = document.createElement("script");
    baseScript.src = "https://cdn.anychart.com/releases/v8/js/anychart-base.min.js";
    baseScript.onload = () => {
      const mapScript = document.createElement("script");
      mapScript.src = "https://cdn.anychart.com/releases/v8/js/anychart-map.min.js";
      mapScript.onload = () => {
        drawMap();
      };
      document.head.appendChild(mapScript);
    };
    document.head.appendChild(baseScript);

    function drawMap() {
      const dataSet = anychart.data.set([
        {
          id: "room1",
          name: "Room 101",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [0, 0],
                [0, 10],
                [10, 10],
                [10, 0],
                [0, 0],
              ],
            ],
          },
        },
      ]);

      const map = anychart.map();
      map.geoData({ type: "FeatureCollection", features: dataSet.mapAs() });
      map.container("map-container");

      // Enable zoom and scroll interaction
      map.interactivity().zoomOnMouseWheel(true);
      map.interactivity().scrollOnMouseWheel(true);

      map.draw();
    }
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div id="map-container" style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
};

export default App;
