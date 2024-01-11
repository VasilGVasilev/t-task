// FUNCTIONS OUTSIDE COMPONENTS TO BE RENDER EFFICIENT

// visualizes specific

export function specificPolyline(lineName, transportData) {
    let indexOfSpecificLine = transportData.findIndex(obj => obj.line === lineName);
    return transportData[indexOfSpecificLine].routes[0].segments.reduce((accumulator, segment) => {
        return accumulator.concat(segment.coordinates.map(coordinate => [coordinate.lat, coordinate.lon], { offset: 5 }));
    }, []);
}

export function allStationsCoords(lineName, transportData) {
    let indexOfSpecificLine = transportData.findIndex(obj => obj.line === lineName);
    return transportData[indexOfSpecificLine].routes[0].stops.map(stop => [stop.location.lat, stop.location.lon])

}

export function specificStationName(lineName, index, transportData) {
    let indexOfSpecificLine = transportData.findIndex(obj => obj.line === lineName);
    return transportData[indexOfSpecificLine].routes[0].stops[index].name

}

// visualize Table components

export function routeName(lineName, transportData, routeA) {
    let indexOfSpecificLine = transportData.findIndex(obj => obj.line === lineName);
    return transportData[indexOfSpecificLine].routes[routeA ? 0 : 1].name
}

export function stopsNameAndCrowding(lineName, transportData, routeA) {
    let indexOfSpecificLine = transportData.findIndex(obj => obj.line === lineName);
    return transportData[indexOfSpecificLine].routes[routeA ? 0 : 1].stops.map(e => ({name: e.name, averagePeople: e.averagePeople}))

}