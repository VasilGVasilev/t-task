import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'

function MyComponent() {
    const navigate = useNavigate()
    useMapEvent('click', () => {
        navigate('/A111')
    })
}
const Home = () => {
    const navigate = useNavigate()

    function handleMarkerClick () {

        navigate('A111')

    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 '>
            <div className='h-full w-full m-5'>
                <MapContainer
                    center={[42.698334, 23.319941]}
                    zoom={13}
                    className='h-[50vh] w-[90vw] md:h-[85vh] md:w-1/2 '
                >
                    <MyComponent />
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
            {/* <MapContainer
                center={[42.698334, 23.319941]}
                zoom={13}
                className='h-full'
            >
                <TileLayer
                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
            </MapContainer> */}
            <div>asdasd</div>
        </div>
    )
};

export default Home;
