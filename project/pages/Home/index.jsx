import "leaflet/dist/leaflet.css"
import { useState } from "react";
import { Circle, MapContainer, Polyline, Popup, TileLayer } from 'react-leaflet'
import { Link, useNavigate } from 'react-router-dom'
import { specificPolyline, allStationsCoords, specificStationName } from "../../utils";
import { useSelector } from "react-redux";



// visualize components

function allStationsVisualized(lineName, transportData) {

    return (allStationsCoords(lineName, transportData).map((coords, index) => {
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

function visualizeLineOnMap(lineName, visibleLineBoolean, transportData, colors, handleLineOnMapClick) {
    return (

        <>
            {
                visibleLineBoolean
                &&
                <>
                    <Polyline
                        pathOptions={{ color: colors[lineName], weight: 6 }}
                        positions={specificPolyline(lineName, transportData)}
                        eventHandlers={{
                            click: () => handleLineOnMapClick(lineName)
                        }}
                    />
                    {allStationsVisualized(lineName, transportData)}
                </>

            }
        </>

    )
}

function visualizeLineOnList(lineName, visibleLineBoolean, colors) {
    return (
        <>
            {
                visibleLineBoolean
                &&
                <Link
                    className="w-5/6 h-auto flex flex-col justify-center items-start p-2 text-white font-semibold rounded-sm shadow-2xl"
                    style={{ backgroundColor: colors[lineName] }}
                    to={`line/${lineName}`}
                >
                    <div>
                        {lineName}
                    </div>
                </Link>

            }
        </>
    )
}


const Home = () => {

    const transportData = useSelector((state)=> state.data.value)
    const colors = useSelector((state)=> state.colors.value)

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
        navigate(`line/${lineName}`)
    }


    return (
        <div className='grid grid-cols-1 md:grid-cols-5 justify-center items-center gap-5 m-5'>
            <div className='h-full md:col-span-3 rounded-2xl '>
                <MapContainer
                    center={[42.688334, 23.319941]}
                    zoom={12}
                    className='h-[50vh] w-full md:h-[85vh] rounded-2xl z-20'
                    scrollWheelZoom={false}
                >
                    {/* this has to be manual due to TM8 and T10 overlapping in natural order of DB */}
                    {
                        visualizeLineOnMap('A111', lineVisible.A111, transportData, colors, handleLineOnMapClick)
                    }
                    {
                        visualizeLineOnMap('A11', lineVisible.A11, transportData, colors, handleLineOnMapClick)
                    }
                    {
                        visualizeLineOnMap('TB11', lineVisible.TB11, transportData, colors, handleLineOnMapClick)
                    }
                    {
                        visualizeLineOnMap('TM10', lineVisible.TM10, transportData, colors, handleLineOnMapClick)
                    }
                    {
                        visualizeLineOnMap('TM8', lineVisible.TM8, transportData, colors, handleLineOnMapClick)
                    }


                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />


                </MapContainer>
            </div>
            <div className=" grid grid-rows-4 md:col-span-2 gap-5 bg-slate-100 rounded-md">
                <div className="row-start-1 row-end-2 flex flex-col justify-center items-center">

                    <div className="flex flex-row justify-center items-center text-white shadow-2xl rounded-xl cursor-pointer font-semibold md:text-3xl select-none">
                        <div
                            style={{ backgroundColor: isFilterClicked['TB'] ? '#0032AA' : '#00BAFC' }}
                            className="text-center rounded-l-md border-r-[1px] border-white py-3 pl-5 pr-3 "
                            onClick={() => hideTypeOfTransport('TB')}
                        >
                            Тролейбус
                        </div>
                        <div
                            style={{ backgroundColor: isFilterClicked['A'] ? '#0032AA' : '#00BAFC' }}
                            className="py-3 px-3"
                            onClick={() => hideTypeOfTransport('A')}

                        >
                            Бус
                        </div>
                        <div
                            style={{ backgroundColor: isFilterClicked['TM'] ? '#0032AA' : '#00BAFC' }}
                            className={`rounded-r-md border-l-[1px] border-white py-3 pl-3 pr-5 `}
                            onClick={() => hideTypeOfTransport('TM')}
                        >
                            Трамвай
                        </div>

                    </div>
                </div>
                <div className="h-48 md:h-60 row-start-2 row-end-4 flex flex-col justify-center items-center gap-3 ">

                    {
                        visualizeLineOnList('A111', lineVisible.A111, colors)
                    }
                    {
                        visualizeLineOnList('A11', lineVisible.A11, colors)
                    }
                    {
                        visualizeLineOnList('TB11', lineVisible.TB11, colors)
                    }
                    {
                        visualizeLineOnList('TM10', lineVisible.TM10, colors)
                    }
                    {
                        visualizeLineOnList('TM8', lineVisible.TM8, colors)
                    }

                </div>

            </div>
        </div>
    )
};

export default Home;


