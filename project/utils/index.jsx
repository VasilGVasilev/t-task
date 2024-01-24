// FUNCTIONS OUTSIDE COMPONENTS TO BE RENDER EFFICIENT

import { Circle, Popup } from "react-leaflet";
import { allStationsCoords, specificStationName } from "./arrays";

// visualize all

export const AllStationsVisualized = (lineName, transportData, currentRoute) => {

    return (allStationsCoords(lineName, transportData, currentRoute).map((coords, index) => {
        return (
            <Circle
                center={coords}
                pathOptions={{ color: "black", fillColor: "white", fillOpacity: 1 }}
                radius={10}
                key={index}
            >
                <Popup
                >
                    {specificStationName(lineName, index, transportData, currentRoute)}
                </Popup>
            </Circle>


        )

    }))
}

