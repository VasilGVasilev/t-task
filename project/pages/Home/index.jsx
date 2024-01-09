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

    function allStations() {
        return transportData.map(element => {
            return (specificStation(element.line).map((coords, index) => {
                return (
                    <Circle
                        center={coords}
                        pathOptions={{ color: colors[element.line], fillColor: colors[element.line] }}
                        radius={40}
                        key={index}
                    >
                        <Popup>
                            {specificStationName(element.line, index)}
                        </Popup>
                    </Circle>

                )

            }))
        })
    }

    function allPolylines() {
        return transportData.map((element, index) => {
            return (
                <Polyline
                    pathOptions={{ color: colors[element.line] }}
                    positions={specificPolyline(element.line)}
                    eventHandlers={{
                        click: () => handleLineOnMapClick(element.line)
                    }}
                    key={index}
                />
            )
        })
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
                    {
                        allPolylines()
                    }

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        allStations()
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