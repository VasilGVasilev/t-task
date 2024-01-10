import "leaflet/dist/leaflet.css"
import { useState } from "react";
import { Circle, MapContainer, Polyline, Popup, TileLayer } from "react-leaflet";

// visualizes Map specific

function specificPolyline(lineName, transportData) {
    let indexOfSpecificLine = transportData.findIndex(obj => obj.line === lineName);
    return transportData[indexOfSpecificLine].routes[0].segments.reduce((accumulator, segment) => {
        return accumulator.concat(segment.coordinates.map(coordinate => [coordinate.lat, coordinate.lon], { offset: 5 }));
    }, []);
}

function specificStation(lineName, transportData) {
    let indexOfSpecificLine = transportData.findIndex(obj => obj.line === lineName);
    return transportData[indexOfSpecificLine].routes[0].stops.map(stop => [stop.location.lat, stop.location.lon])

}

function specificStationName(lineName, index, transportData) {
    let indexOfSpecificLine = transportData.findIndex(obj => obj.line === lineName);
    return transportData[indexOfSpecificLine].routes[0].stops[index].name

}


// visualize Map components

function allStations(lineName, transportData) {

    return (specificStation(lineName, transportData).map((coords, index) => {
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


const Line = ({ transportData, colors }) => {
    // easier toggle with Boolean
    const [routeA, setRouteA] = useState(true)
    const lineName = 'A11';

    function handleClickChangeRoute(){
        setRouteA(!routeA)
    }


    return (
        <div className="flex flex-col justify-center items-center">
            <div className="h-full w-full">

                <MapContainer
                    center={[42.688334, 23.319941]}
                    zoom={12}
                    className='h-[50vh] w-full md:h-[85vh] z-20'
                    scrollWheelZoom={false}
                >
                    <Polyline
                        pathOptions={{ color: colors[lineName], weight: 6 }}
                        positions={specificPolyline(lineName, transportData)}

                    />
                    {allStations(lineName, transportData)}


                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />


                </MapContainer>
            </div>
            <div className="relative flex flex-row justify-center items-center">
                <div 
                    className="absolute -top-10 z-50 p-10 rounded-3xl bg-red-600"
                    onClick={handleClickChangeRoute}
                >
                    change
                </div>
                <div>Table</div>
            </div>
        </div>
    );
};

export default Line;
