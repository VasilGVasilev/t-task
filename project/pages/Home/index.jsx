import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"

const Home = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 '>
            <div className='h-full w-full m-5'>
                <MapContainer 
                    center={[42.698334, 23.319941]} 
                    zoom={13} 
                    className='h-[50vh] w-[90vw] md:h-[85vh] md:w-1/2 '
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
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
