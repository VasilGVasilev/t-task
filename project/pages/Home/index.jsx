import "leaflet/dist/leaflet.css"
import { useState } from "react";
import { Circle, MapContainer, Polyline, Popup, TileLayer } from 'react-leaflet'
import { Link, useNavigate } from 'react-router-dom'



const Home = ({ transportData, colors }) => {

    const navigate = useNavigate()

    const [lineVisible, setLineVisible] = useState({
        A111: true,
        A11: true,
        TB11: true,
        TM8: true,
        TM10: true
    })

    const [isFilterClicked, setIsFilterClicked] = useState({
        'A': true,
        'TB': true,
        'TM': true,
    })

    // visualizes specific

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


    // visualize components

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

    function visualizeLineOnMap(lineName, visibleLineBoolean) {
        return (

            <>
                {
                    visibleLineBoolean
                    &&
                    <>
                        <Polyline
                            pathOptions={{ color: colors[lineName], weight: 6 }}
                            positions={specificPolyline(lineName)}
                            eventHandlers={{
                                click: () => handleLineOnMapClick(lineName)
                            }}
                        />
                        {allStations(lineName)}
                    </>

                }
            </>

        )
    }

    function visualizeLineOnList(lineName, visibleLineBoolean) {
        return (
            <>
                {
                    visibleLineBoolean
                    &&
                    <Link
                        className="w-5/6 h-auto flex flex-col justify-center items-start p-2 rounded-sm"
                        style={{ backgroundColor: colors[lineName] }}
                        to={lineName}
                    >
                        <div>
                            {lineName}
                        </div>
                    </Link>

                }
            </>
        )
    }



    // Handle visibility of lines on map and in list

    function changeLineVisibility(lineName) {
        setLineVisible(prevState => ({
            ...prevState,
            [lineName]: !prevState[lineName]
        }))
    }

    function hideTypeOfTransport(typeOfTrans) {
        setIsFilterClicked(prevState => ({
            ...prevState,
            [typeOfTrans]: !prevState[typeOfTrans]
        }))
        const arrBuses = []
        transportData.map(element => {
            if (element.routes[0]["transportType"] === typeOfTrans) {
                arrBuses.push(element.line)
            }

        })
        arrBuses.map(bus => {
            changeLineVisibility(bus)
        })
    }

    // Handle clicks on LeafletMap
    function handleLineOnMapClick(lineName) {
        navigate(lineName)
    }


    return (
        <div className='grid grid-cols-1 md:grid-cols-5 justify-center items-center gap-5 m-5'>
            <div className='w-90 h-full md:col-span-3 rounded-2xl '>
                <MapContainer
                    center={[42.688334, 23.319941]}
                    zoom={12}
                    className='h-[50vh] w-full md:h-[85vh] rounded-2xl z-20'
                    scrollWheelZoom={false}
                >
                    {/* this has to be manual due to TM8 and T10 overlapping in natural order of DB */}
                    {
                        visualizeLineOnMap('A111', lineVisible.A111)
                    }
                    {
                        visualizeLineOnMap('A11', lineVisible.A11)
                    }
                    {
                        visualizeLineOnMap('TB11', lineVisible.TB11)
                    }
                    {
                        visualizeLineOnMap('TM10', lineVisible.TM10)
                    }
                    {
                        visualizeLineOnMap('TM8', lineVisible.TM8)
                    }


                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />


                </MapContainer>
            </div>
            <div className="w-full h-full grid grid-rows-4 md:col-span-2 gap-5">
                <div className="row-start-1 row-end-2 flex flex-col justify-center items-center">

                    <div className="flex flex-row justify-center items-center text-white shadow-2xl rounded-xl cursor-pointer font-bold md:text-3xl select-none">
                        <div
                            style={{ backgroundColor: isFilterClicked['A'] ? '#0032AA' : '#00BAFC' }}
                            className="text-center rounded-l-md border-r-[1px] border-white py-3 pl-5 pr-3 "
                            onClick={() => hideTypeOfTransport('A')}
                        >
                            Bus
                        </div>
                        <div
                            style={{ backgroundColor: isFilterClicked['TB'] ? '#0032AA' : '#00BAFC' }}
                            className="py-3 px-3"
                            onClick={() => hideTypeOfTransport('TB')}
                        >
                            Trolleybus
                        </div>
                        <div
                            style={{ backgroundColor: isFilterClicked['TM'] ? '#0032AA' : '#00BAFC' }}
                            className={`rounded-r-md border-l-[1px] border-white py-3 pl-3 pr-5 `}
                            onClick={() => hideTypeOfTransport('TM')}
                        >
                            Tram
                        </div>

                    </div>
                </div>
                <div className="row-start-2 row-end-4  flex flex-col justify-center items-center gap-1">

                    {
                        visualizeLineOnList('A111', lineVisible.A111)
                    }
                    {
                        visualizeLineOnList('A11', lineVisible.A11)
                    }
                    {
                        visualizeLineOnList('TB11', lineVisible.TB11)
                    }
                    {
                        visualizeLineOnList('TM10', lineVisible.TM10)
                    }
                    {
                        visualizeLineOnList('TM8', lineVisible.TM8)
                    }

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