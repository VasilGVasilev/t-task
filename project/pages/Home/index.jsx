import "leaflet/dist/leaflet.css"
import { Circle, MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'



const Home = ({ transportData, colors }) => {
    const navigate = useNavigate()


    function specificPolyline(lineName) {
        let indexOfSpecificLine = transportData.findIndex(obj => obj.line === lineName);
        return transportData[indexOfSpecificLine].routes[0].segments.reduce((accumulator, segment) => {
            return accumulator.concat(segment.coordinates.map(coordinate => [coordinate.lat, coordinate.lon]));
        }, []);
    }

    function specificStation(lineName) {
        let indexOfSpecificLine = transportData.findIndex(obj => obj.line === lineName);
        return transportData[indexOfSpecificLine].routes[0].stops.map(stop => [stop.location.lat, stop.location.lon])

    }

    function specificStationName(lineName, index) {
        let indexOfSpecificLine = transportData.findIndex(obj => obj.line === lineName);
        return transportData[indexOfSpecificLine].routes[0].stops[index].name

    }

    function handleLineOnMapClick(lineName) {
        navigate(lineName)
    }



    return (
        <div className='grid grid-cols-1 md:grid-cols-2 '>
            <div className='m-5'>
                <MapContainer
                    center={[42.688334, 23.319941]}
                    zoom={12}
                    className='h-[50vh] w-[90vw] md:h-[85vh] md:w-full'
                    scrollWheelZoom={false}
                >
                    <Polyline
                        pathOptions={{ color: colors.A111 }}
                        positions={specificPolyline('A111')}
                        eventHandlers={{
                            click: () => handleLineOnMapClick('A111')
                        }}
                    />

                    <Polyline
                        pathOptions={{ color: colors.A11 }}
                        positions={specificPolyline('A11')}
                        eventHandlers={{
                            click: () => handleLineOnMapClick('A11')
                        }}
                    />
                    <Polyline
                        pathOptions={{ color: colors.TB11 }}
                        positions={specificPolyline('TB11')}
                        eventHandlers={{
                            click: () => handleLineOnMapClick('TB11')
                        }}
                    />

                    <Polyline
                        pathOptions={{ color: colors.TM10 }}
                        positions={specificPolyline('TM10')}
                        eventHandlers={{
                            click: () => handleLineOnMapClick('TM10')
                        }}
                    />
                    <Polyline
                        pathOptions={{ color: colors.TM8 }}
                        positions={specificPolyline('TM8')}
                        eventHandlers={{
                            click: () => handleLineOnMapClick('TM8')
                        }}
                    />

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        specificStation('A111').map((coords, index) => {
                            return (
                                <Circle
                                    center={coords}
                                    pathOptions={{ color: colors.A111, fillColor: colors.A111 }}
                                    radius={40}
                                    key={index}
                                >
                                    <Popup>
                                        {specificStationName("A111", index)}
                                    </Popup>
                                </Circle>

                            )

                        })
                    }
                    {
                        specificStation('A11').map((coords, index) => {
                            return (
                                <Circle
                                    center={coords}
                                    pathOptions={{ color: colors.A11, fillColor: colors.A11 }}
                                    radius={40}
                                    key={index}
                                >
                                    <Popup>
                                        {specificStationName("A11", index)}
                                    </Popup>
                                </Circle>

                            )

                        })
                    }
                    {
                        specificStation('TB11').map((coords, index) => {
                            return (
                                <Circle
                                    center={coords}
                                    pathOptions={{ color: colors.TB11, fillColor: colors.TB11 }}
                                    radius={40}
                                    key={index}
                                >
                                    <Popup>
                                        {specificStationName("TB11", index)}
                                    </Popup>
                                </Circle>

                            )

                        })
                    }
                    {
                        specificStation('TM8').map((coords, index) => {
                            return (
                                <Circle
                                    center={coords}
                                    pathOptions={{ color: colors.TM8, fillColor: colors.TM8 }}
                                    radius={40}
                                    key={index}
                                >
                                    <Popup>
                                        {specificStationName("TM8", index)}
                                    </Popup>
                                </Circle>

                            )

                        })
                    }
                    {
                        specificStation('TM10').map((coords, index) => {
                            return (
                                <Circle
                                    center={coords}
                                    pathOptions={{ color: colors.TM10, fillColor: colors.TM10 }}
                                    radius={40}
                                    key={index}
                                >
                                    <Popup>
                                        {specificStationName("TM10", index)}
                                    </Popup>
                                </Circle>

                            )

                        })
                    }
                </MapContainer>
            </div>
            <div className="m-5">asdasd</div>
        </div>
    )
};

export default Home;



// transportData.map(element => {
//     element.routes[0].segments.map(segment => {
//         segment.coordinates.map(coordinate => {
//             polyline.push([coordinate.lat, coordinate.lon])
//         })
//     })
// })