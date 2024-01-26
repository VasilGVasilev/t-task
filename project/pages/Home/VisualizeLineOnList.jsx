import { memo } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export const VisualizeLineOnList = memo(function VisualizeLineOnList({ lineName, visibleLineBoolean }) {
    const colors = useSelector((state) => state.colors.colors)
    
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
})