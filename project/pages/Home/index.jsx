import "leaflet/dist/leaflet.css"
import { useMemo, useState } from "react";
import { MapContainer, TileLayer } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'


import { useSelector } from "react-redux";
import { VisualizeLinesOnMap } from "./VisualizeLinesOnMap";
import { VisualizeLineOnList } from "./VisualizeLineOnList";





const Home = () => {

    const transportData = useSelector((state) => state.data.data)
    const dataStatus = useSelector(state => state.data.status)
    const errorData = useSelector(state => state.data.error)

    const colors = useSelector((state) => state.colors.colors)
    const colorsStatus = useSelector(state => state.colors.status)
    const errorColors = useSelector(state => state.colors.error)


    const navigate = useNavigate()
    // Redux state cache

    const linesNames = useMemo(() => {
        if (dataStatus === 'succeeded' && colorsStatus === 'succeeded') {
            return transportData.map(line => line.line);
        }
        return [];
    }, [transportData]);

    // local states
    const [lineVisible, setLineVisible] = useState({
        A111: true,
        A11: true,
        TB11: true,
        TM10: true,
        TM8: true,
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

        transportData.filter(element => {
            return element.routes[0]["transportType"] === typeOfTrans
        }).forEach(element => {
            changeLineVisibility(element.line)
        })

    }

    // Handle clicks on LeafletMap
    function handleLineOnMapClick(lineName) {
        navigate(`line/${lineName}`)
    }



    let content

    if (dataStatus === 'loading' && colorsStatus === 'loading') {
        content = <div>Loading...</div>
    } else if (dataStatus === 'succeeded' && colorsStatus === 'succeeded') {
        // Sort posts in reverse chronological order by datetime string
        return (
            <div className='grid grid-cols-1 md:grid-cols-5 justify-center items-center gap-5 m-5'>
                <div className='h-full md:col-span-3 rounded-2xl '>
                    <MapContainer
                        center={[42.688334, 23.319941]}
                        zoom={12}
                        className='h-[50vh] w-full md:h-[85vh] rounded-2xl z-20'
                        scrollWheelZoom={false}
                    >
                        {/* why not forEach but map -> forEach is used for side effects, while map actaully returns an array */}
                        {
                            linesNames.map((lineName) => {
                                return (

                                    <VisualizeLinesOnMap
                                        key={lineName}
                                        lineName={lineName}
                                        visibleLineBoolean={lineVisible[lineName]}
                                        transportData={transportData}
                                        colors={colors}
                                        handleLineOnMapClick={handleLineOnMapClick}
                                    >
                                    </VisualizeLinesOnMap>
                                )

                            })
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
                        {/* why not forEach but map -> forEach is used for side effects, while map actaully returns an array */}

                        {
                            linesNames.map((lineName) => {
                                return (

                                    <VisualizeLineOnList
                                        key={lineName}
                                        lineName={lineName}
                                        visibleLineBoolean={lineVisible[lineName]}
                                    >
                                    </VisualizeLineOnList>
                                )

                            })
                        }


                    </div>

                </div>
            </div>
        )
    } else if (dataStatus === 'failed' && colorsStatus === 'failed') {
        content = <div>{errorData}{errorColors}</div>
    }

};

export default Home;


