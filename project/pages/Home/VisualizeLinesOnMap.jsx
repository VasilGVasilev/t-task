import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { specificPolyline } from "../../utils/arrays";
import { Polyline } from "react-leaflet";
import { AllStationsVisualized } from "../../components/AllStationsVisualized";

export const VisualizeLinesOnMap = memo(function VisualizeLinesOnMap({ lineName, visibleLineBoolean, colors, handleLineOnMapClick }) {
    const transportData = useSelector((state) => state.data.data)
    
    const routes = useMemo(() => {
        return transportData.find(line => line.line == lineName).routes

    }, [transportData, lineName]);

    const memoizedPositions = useMemo(() => routes.map((element, currentRoute) => specificPolyline(lineName, transportData, currentRoute)), [lineName, transportData]);
    return (

        <>
            {
                visibleLineBoolean
                &&
                <>
                    {
                        memoizedPositions.map((coordinates, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Polyline
                                        pathOptions={{ color: colors[lineName], weight: 3 }}
                                        positions={coordinates}
                                        eventHandlers={{
                                            click: () => handleLineOnMapClick(lineName)
                                        }}
                                    />
                                    <AllStationsVisualized
                                        lineName={lineName}
                                        currentRoute={index}
                                    >
                                    </AllStationsVisualized>

                                </React.Fragment>
                            )

                        })
                    }

                </>

            }
        </>

    )
})
