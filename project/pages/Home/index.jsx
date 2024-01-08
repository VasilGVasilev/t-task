import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'


const optionA111 = { color: '#dc2626' }
const optionA11 = { color: '#ca8a04' }
const optionTB11 = { color: '#ea580c' }
const optionTM8 = { color: '#6b21a8' }
const optionTM10 = { color: '#4b5563' }


const Home = ({ transportData }) => {
    const navigate = useNavigate()


    const polylineA111 = transportData[0].routes[0].segments.reduce((accumulator, segment) => {
        return accumulator.concat(segment.coordinates.map(coordinate => [coordinate.lat, coordinate.lon]));
    }, []);

    const polylineA11 = transportData[1].routes[0].segments.reduce((accumulator, segment) => {
        return accumulator.concat(segment.coordinates.map(coordinate => [coordinate.lat, coordinate.lon]));
    }, []);

    const polylineTB11 = transportData[2].routes[0].segments.reduce((accumulator, segment) => {
        return accumulator.concat(segment.coordinates.map(coordinate => [coordinate.lat, coordinate.lon]));
    }, []);

    const polylineTM8 = transportData[3].routes[0].segments.reduce((accumulator, segment) => {
        return accumulator.concat(segment.coordinates.map(coordinate => [coordinate.lat, coordinate.lon]));
    }, []);

    const polylineTM10 = transportData[4].routes[0].segments.reduce((accumulator, segment) => {
        return accumulator.concat(segment.coordinates.map(coordinate => [coordinate.lat, coordinate.lon]));
    }, []);



    function handleLineA111Click() {
        navigate('A111')
    }
    console.log(transportData);
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 '>
            <div className='m-5'>
                <MapContainer
                    center={[42.698334, 23.319941]}
                    zoom={12}
                    className='h-[50vh] w-[90vw] md:h-[85vh] md:w-full '
                >

                    <Polyline
                        pathOptions={optionA111}
                        positions={polylineA111}
                        eventHandlers={{
                            click: handleLineA111Click
                        }}
                    />
                    <Polyline
                        pathOptions={optionA11}
                        positions={polylineA11}
                        eventHandlers={{
                            click: handleLineA111Click
                        }}
                    />
                    <Polyline
                        pathOptions={optionTB11}
                        positions={polylineTB11}
                        eventHandlers={{
                            click: handleLineA111Click
                        }}
                    />
                    <Polyline
                        pathOptions={optionTM8}
                        positions={polylineTM8}
                        eventHandlers={{
                            click: handleLineA111Click
                        }}
                    />
                    <Polyline
                        pathOptions={optionTM10}
                        positions={polylineTM10}
                        eventHandlers={{
                            click: handleLineA111Click
                        }}
                    />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
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