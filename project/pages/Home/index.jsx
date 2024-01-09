import "leaflet/dist/leaflet.css"
import { useState } from "react";
import { Circle, MapContainer, Polyline, Popup, TileLayer } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'



const Home = ({ transportData, colors }) => {
    const [visibleA111, setVisibleA111] = useState(true);
    const [visibleA11, setVisibleA11] = useState(true);
    const [visibleTB11, setVisibleTB11] = useState(true);
    const [visibleTM8, setVisibleTM8] = useState(true);
    const [visibleTM10, setVisibleTM10] = useState(true);



    const navigate = useNavigate()


    function specificPolyline(lineName) {
        let indexOfSpecificLine = transportData.findIndex(obj => obj.line === lineName);
        return transportData[indexOfSpecificLine].routes[0].segments.reduce((accumulator, segment) => {
            return accumulator.concat(segment.coordinates.map(coordinate => [coordinate.lat, coordinate.lon], { offset: 5 }));
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



    function allStations(lineName) {

        return (specificStation(lineName).map((coords, index) => {
            return (

                <Circle
                    center={coords}
                    pathOptions={{ color: "black", fillColor: "white", fillOpacity: 1 }}
                    radius={20}
                    key={index}
                >
                    <Popup
                    >
                        {specificStationName(lineName, index)}
                    </Popup>
                </Circle>

            )

        }))
    }

    function visalizeLine(lineName, visibleLineBoolean) {
        return (

            <>
                {
                    visibleLineBoolean
                    &&
                    <div>
                        <Polyline
                            pathOptions={{ color: colors[lineName], weight: 6 }}
                            positions={specificPolyline(lineName)}
                            eventHandlers={{
                                click: () => handleLineOnMapClick(lineName)
                            }}
                        />
                        {allStations(lineName)}
                    </div>

                }
            </>

        )
    }

    function handleLineOnMapClick(lineName) {
        navigate(lineName)
    }

    function checkA111visibility() {
        setVisibleA111(!visibleA111)
    }
    function checkA11visibility() {
        setVisibleA11(!visibleA11)
    }
    function checkTB11visibility() {
        setVisibleTB11(!visibleTB11)
    }
    function checkTM8visibility() {
        setVisibleTM8(!visibleTM8)
    }
    function checkTM10visibility() {
        setVisibleTM10(!visibleTM10)
    }


    return (
        <div className='grid grid-cols-1 md:grid-cols-4 justify-center items-center gap-5'>
            <div className='w-90 h-full md:col-span-3 rounded-2xl '>
                <MapContainer
                    center={[42.688334, 23.319941]}
                    zoom={12}
                    className='h-[50vh] w-full md:h-[85vh] rounded-2xl z-20'
                    scrollWheelZoom={false}
                >

                    {
                        visalizeLine('A111', visibleA111)
                    }
                    {
                        visalizeLine('A11', visibleA11)
                    }
                    {
                        visalizeLine('TB11', visibleTB11)
                    }
                    {
                        visalizeLine('TM10', visibleTM10)
                    }
                    {
                        visalizeLine('TM8', visibleTM8)
                    }


                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />


                </MapContainer>
            </div>
            <div className="w-full h-full grid grid-rows-4 md:col-span-1">
                <div className="row-start-1 row-end-2 flex flex-col justify-center items-center">

                    <div className="flex flex-row justify-center items-center text-white shadow-2xl rounded-[400px] cursor-pointer ">
                        <div className="bg-ptskyBlue rounded-l-[400px] border-r-[1px] border-white py-2 pl-3 pr-1 hover:bg-[#0032AA] transition duration-300 ease-in-out">Bus</div>
                        <div className="bg-gradient-to-r from-ptskyBlue to-blue-400 py-2 px-1 hover:bg-[#0032AA] transition duration-300 ease-in-out">Trolleybus</div>
                        <div className="bg-blue-400 rounded-r-[400px] border-l-[1px] border-white py-2 pl-1 pr-3 hover:bg-[#0032AA] transition duration-300 ease-in-out">Tram</div>

                    </div>
                </div>
                <div className="row-start-2 row-end-4 bg-orange-300 flex flex-col justify-center items-center">
                    <button onClick={checkA111visibility}>
                        A111
                    </button>
                    <button onClick={checkA11visibility}>
                        A11
                    </button>
                    <button onClick={checkTB11visibility}>
                        TB11
                    </button>
                    <button onClick={checkTM10visibility}>
                        TM10
                    </button>
                    <button onClick={checkTM8visibility}>
                        TM8
                    </button>
                </div>

            </div>
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