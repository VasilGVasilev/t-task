// visualizes specific arrays

export function specificPolyline(lineName, transportData, currentRoute) {
    return transportData.find(obj => obj.line === lineName).routes[currentRoute].segments.reduce((accumulator, segment) => {
        return accumulator.concat(segment.coordinates.map(coordinate => [coordinate.lat, coordinate.lon], { offset: 5 }));
    }, []);
}

export function allStationsCoords(lineName, transportData, currentRoute) {
    return transportData.find(obj => obj.line === lineName).routes[currentRoute].stops.map(stop => [stop.location.lat, stop.location.lon])

}

export function specificStationName(lineName, index, transportData, currentRoute) {
    return transportData.find(obj => obj.line === lineName).routes[currentRoute].stops[index].name

}

// visualize Table components

export function routeName(lineName, transportData, routeA) {
    return transportData.find(obj => obj.line === lineName).routes[routeA ? 0 : 1].name
}

export function stopsNameAndCrowding(lineName, transportData, routeA) {
    return transportData.find(obj => obj.line === lineName).routes[routeA ? 0 : 1].stops.map(e => ({name: e.name, averagePeople: e.averagePeople}))

}