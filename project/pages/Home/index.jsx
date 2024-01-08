import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'


const limeOptions = { color: 'red' }

const Home = ({ transportData }) => {
    const polylineA111 = [
        
    ]

    // transportData.map(element => {
    //     element.routes[0].segments.map(segment => {
    //         segment.coordinates.map(coordinate => {
    //             polyline.push([coordinate.lat, coordinate.lon])
    //         })
    //     })
    // })
    const navigate = useNavigate()

    function handleMarkerClick() {

        navigate('A111')

    }
    function handleLineA111Click() {
        navigate('A111')
    }
    console.log(transportData);
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 '>
            <div className='m-5'>
                <MapContainer
                    center={[42.698334, 23.319941]}
                    zoom={13}
                    className='h-[50vh] w-[90vw] md:h-[85vh] md:w-full '
                >
                    {

                    }
                    <Polyline
                        pathOptions={limeOptions}
                        positions={polyline}
                        eventHandlers={{
                            click: handleLineA111Click
                        }}
                    />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                        position={[42.698334, 23.319941]}
                        eventHandlers={{
                            click: handleMarkerClick
                        }}
                    />
                </MapContainer>
            </div>
            <div className="m-5">asdasd</div>
        </div>
    )
};

export default Home;
