// FUNCTIONS OUTSIDE COMPONENTS TO BE RENDER EFFICIENT

import { Circle, Popup } from "react-leaflet";

// visualize all

export const AllStationsVisualized = (lineName, transportData) => {

    return (allStationsCoords(lineName, transportData).map((coords, index) => {
        return (

            <Circle
                center={coords}
                pathOptions={{ color: "black", fillColor: "white", fillOpacity: 1 }}
                radius={20}
                key={index}
            >
                <Popup
                >
                    {specificStationName(lineName, index, transportData)}
                </Popup>
            </Circle>

        )

    }))
}

// visualizes specific arrays

export function specificPolyline(lineName, transportData) {
    return transportData.find(obj => obj.line === lineName).routes[0].segments.reduce((accumulator, segment) => {
        return accumulator.concat(segment.coordinates.map(coordinate => [coordinate.lat, coordinate.lon], { offset: 5 }));
    }, []);
}

export function allStationsCoords(lineName, transportData) {
    return transportData.find(obj => obj.line === lineName).routes[0].stops.map(stop => [stop.location.lat, stop.location.lon])

}

export function specificStationName(lineName, index, transportData) {
    return transportData.find(obj => obj.line === lineName).routes[0].stops[index].name

}

// visualize Table components

export function routeName(lineName, transportData, routeA) {
    return transportData.find(obj => obj.line === lineName).routes[routeA ? 0 : 1].name
}

export function stopsNameAndCrowding(lineName, transportData, routeA) {
    return transportData.find(obj => obj.line === lineName).routes[routeA ? 0 : 1].stops.map(e => ({name: e.name, averagePeople: e.averagePeople}))

}