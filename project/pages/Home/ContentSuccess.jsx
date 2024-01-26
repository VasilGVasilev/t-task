import React, { useMemo, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { useSelector } from 'react-redux';
import { VisualizeLinesOnMap } from './VisualizeLinesOnMap';
import { useNavigate } from 'react-router-dom';
import { VisualizeLineOnList } from './VisualizeLineOnList';

const ContentSuccess = () => {
    const transportData = useSelector((state) => state.data.data)
    const colors = useSelector((state) => state.colors.colors)
    const navigate = useNavigate()

    const linesNames = useMemo(() => {
        return transportData.map(line => line.line);
    }, [transportData]);

    const linesTypes = useMemo(() => {
        return [...new Set(transportData.map(line => line.routes[0].transportType))];
    }, [transportData]);

    // local states
    const initLineVisible = useMemo(() => {
        if (linesNames.length > 0) {
            return linesNames.reduce((accumulator, item) => {
                accumulator[item] = true;
                return accumulator;
            }, {})
        }

    }, [linesNames])

    const initIsFilterVisible = useMemo(() => {
        if (linesTypes.length > 0) {
            return linesTypes.reduce((accumulator, item) => {
                accumulator[item] = true;
                return accumulator;
            }, {})
        }

    }, [linesTypes])

    const [lineVisible, setLineVisible] = useState(initLineVisible)

    const [isFilterClicked, setIsFilterClicked] = useState(initIsFilterVisible)

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
}

export default ContentSuccess
