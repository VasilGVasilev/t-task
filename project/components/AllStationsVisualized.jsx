// FUNCTIONS OUTSIDE COMPONENTS TO BE RENDER EFFICIENT

import { Circle, Popup } from "react-leaflet";
import { allStationsCoordsAndName } from "../utils/arrays";
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";

// visualize all

export const AllStationsVisualized = memo(function AllStationsVisualized({lineName, currentRoute}) {
    const transportData = useSelector((state) => state.data.data)
    const stationCoordsAndName = useMemo(()=>{
        return allStationsCoordsAndName(lineName, transportData, currentRoute)
    },[lineName, transportData, currentRoute])
    return (stationCoordsAndName.map((stop, index) => {
        return (
            <Circle
                center={[stop.lat, stop.lon]}
                pathOptions={{ color: "black", fillColor: "white", fillOpacity: 1 }}
                radius={10}
                key={index}
            >
                <Popup
                >
                    {stop.name}
                </Popup>
            </Circle>


        )

    }))
})

