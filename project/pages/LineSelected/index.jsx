import "leaflet/dist/leaflet.css"
import React, { useState } from "react";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";

import { CgArrowsExchangeAltV } from "react-icons/cg";
import { FaArrowDown } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { FaUserGroup } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";

import { AllStationsVisualized, } from "../../utils/index";
import { specificPolyline, routeName, stopsNameAndCrowding, } from "../../utils/arrays";

import { useSelector } from "react-redux";




// visualize Table components

function visualizeCrowding(input) {

    if (input === 'NaN') {
        return 'NaN'
    }

    let number = Math.ceil(Number(input))

    if (number > 5) {
        return <HiUserGroup className="text-red-600" size={20} />
    } else if (number >= 0) {
        return <FaUserGroup className="text-yellow-600" size={20} />
    } else if (number < 0) {
        return <IoPersonSharp className="text-green-600" size={20} />
    }
}



const Line = () => {

    // Redux state
    const transportData = useSelector((state) => state.data.data)
    const dataStatus = useSelector(state => state.data.status)
    const errorData = useSelector(state => state.data.error)

    const colors = useSelector((state) => state.colors.colors)
    const colorsStatus = useSelector(state => state.colors.status)
    const errorColors = useSelector(state => state.colors.error)

    // Easier toggle with Boolean based on being or not being route A

    const [routeA, setRouteA] = useState(true)
    let { id } = useParams();
    const lineName = id;
    // Handle toggle route
    function handleClickChangeRoute() {
        setRouteA(!routeA)
    }


    let content

    if (dataStatus === 'loading' && colorsStatus === 'loading') {
        content = <div>Loading...</div>
    } else if (dataStatus === 'succeeded' && colorsStatus === 'succeeded') {
        // Sort posts in reverse chronological order by datetime string
        const routes = transportData.find(line => line.line == lineName).routes

        return (
            <div className="flex flex-col justify-center items-center gap-10">
                <div className="relative h-full w-full flex flex-col justify-center items-center">
                    <div
                        className="absolute -bottom-8 z-30 p-3 rounded-full bg-ptskyBlue hover:bg-ptdarkBlue cursor-pointer"
                        onClick={handleClickChangeRoute}
                    >
                        <CgArrowsExchangeAltV className="text-white" size={50} />
                    </div>
                    <MapContainer
                        // props are immutable so cannot make dynamic centering of map for each line
                        center={[42.688334, 23.319941]}
                        zoom={12}
                        className='h-[50vh] w-full md:h-[85vh] z-20'
                        scrollWheelZoom={false}
                    >
                        {/* why not forEach but map -> forEach is used for side effects, while map actaully returns an array */}

                        {
                            routes.map((element, currentRoute) => {
                                return (

                                    <React.Fragment key={element.id}>
                                        <Polyline
                                            pathOptions={{ color: colors[lineName], weight: 3 }}
                                            positions={specificPolyline(lineName, transportData, currentRoute)}

                                        />
                                        {AllStationsVisualized(lineName, transportData, currentRoute)}
                                    </React.Fragment>
                                )


                            })
                        }


                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />


                    </MapContainer>
                </div>
                <div className="m-5 flex flex-col justify-center items-center text-xxs sm:text-base">


                    <table className="h-full w-full">
                        <thead>
                            <tr className="">
                                <th className="px-3 text-left bg-ptskyBlue text-white">{routeName(lineName, transportData, routeA)}</th>
                                <th className="px-3 text-left bg-ptskyBlue text-white">Натовареност</th>
                                <th className="px-3 text-left bg-ptskyBlue text-white"><FaArrowDown /></th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {
                                stopsNameAndCrowding(lineName, transportData, routeA).map((stop, index) => {
                                    return (

                                        <tr className="bg-blue-100 even:bg-slate-100" key={index}>
                                            <td className="p-3 text-left">{stop.name}</td>
                                            <td className="p-3 flex flex-row justify-center items-center">{visualizeCrowding(stop.averagePeople)}</td>
                                            <td className="p-3 "><FaArrowDown /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>

                </div>
            </div >
        );
    } else if (dataStatus === 'failed' && colorsStatus === 'failed') {
        content = <div>{errorData}{errorColors}</div>
    }


};

export default Line;
