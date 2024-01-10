import "leaflet/dist/leaflet.css"
import { useState } from "react";
import { Circle, MapContainer, Polyline, Popup, TileLayer } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'



const Home = ({ transportData, colors }) => {
    const [lineVisible, setLineVisible] = useState({
        A111: true,
        A11: true,
        TB11: true,
        TM8: true,
        TM10: true
    })



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

    function changeLineVisibility(lineName) {
        setLineVisible(prevState => ({
            ...prevState,
            [lineName]: !prevState[lineName]
        }))
    }

    function hideBusLines(){
        const arrBuses = []
        transportData.map(element=>{
            if(element.routes[0]["transportType"] === "A"){
                arrBuses.push(element.line)
            }
            
        })
        arrBuses.map(bus =>{
            changeLineVisibility(bus)
        })
    }

    function hideTramLines(){
        const arrTrams = []
        transportData.map(element=>{
            if(element.routes[0]["transportType"] === "TM"){
                arrTrams.push(element.line)
            }
            
        })
        arrTrams.map(tram =>{
            changeLineVisibility(tram)
        })
    }

    function hideTrolleybusLines(){
        const arrTrolleybus = []
        transportData.map(element=>{
            if(element.routes[0]["transportType"] === "TB"){
                arrTrolleybus.push(element.line)
            }
            
        })
        arrTrolleybus.map(trolleybus =>{
            changeLineVisibility(trolleybus)
        })
    }

    // function checkTramVisibility(){
    //     transportData.map(element =>{
    //         const transType = element.routes[0].transportType;
    //         if(transType === 'A'){
    //             checkTM8visibility();
    //             checkTM10visibility();
    //         }
    //     })
    // }


    return (
        <div className='grid grid-cols-1 md:grid-cols-5 justify-center items-center gap-5'>
            <div className='w-90 h-full md:col-span-3 rounded-2xl '>
                <MapContainer
                    center={[42.688334, 23.319941]}
                    zoom={12}
                    className='h-[50vh] w-full md:h-[85vh] rounded-2xl z-20'
                    scrollWheelZoom={false}
                >

                    {
                        visalizeLine('A111', lineVisible.A111)
                    }
                    {
                        visalizeLine('A11', lineVisible.A11)
                    }
                    {
                        visalizeLine('TB11', lineVisible.TB11)
                    }
                    {
                        visalizeLine('TM10', lineVisible.TM10)
                    }
                    {
                        visalizeLine('TM8', lineVisible.TM8)
                    }


                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />


                </MapContainer>
            </div>
            <div className="w-full h-full grid grid-rows-4 md:col-span-2">
                <div className="row-start-1 row-end-2 flex flex-col justify-center items-center">

                    <div className="flex flex-row justify-center items-center text-white shadow-2xl rounded-xl cursor-pointer font-extrabold text-4xl ">
                        <div
                            className=" rounded-l-xl border-r-[1px] border-white py-3 pl-5 pr-2 bg-ptskyBlue"
                            onClick={hideBusLines}
                        >
                            Bus
                        </div>
                        <div
                            className="py-3 px-3 bg-ptskyBlue"
                            onClick={hideTrolleybusLines}

                        >
                            Trolleybus
                        </div>
                        <div
                            className={`rounded-r-xl border-l-[1px] border-white py-3 pl-2 pr-5  bg-ptskyBlue`}
                            onClick={hideTramLines}
                        
                        >
                            Tram
                        </div>

                    </div>
                </div>
                <div className="row-start-2 row-end-4 bg-gray-200 flex flex-col justify-center items-center">
                    <button onClick={() => changeLineVisibility('A111')}>
                        A111
                    </button>
                    <button onClick={() => changeLineVisibility('A11')}>
                        A11
                    </button>
                    <button onClick={() => changeLineVisibility('TB11')}>
                        TB11
                    </button>
                    <button onClick={() => changeLineVisibility('TM10')}>
                        TM10
                    </button>
                    <button onClick={() => changeLineVisibility('TM8')}>
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