import { useRef, useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';


import { motion } from "framer-motion"

import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'




const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.3,
        },
    },
};

const navbarVariant = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
};

const LinkMobileTemplate = ({ urlLink, page, setIsMenuToggled, lineColor }) => {
    const location = useLocation()

    return (
        <motion.div
            variants={navbarVariant}
            viewport={{ once: true }}
            style={{"backgroundColor": "white"}}
            className="w-full h-auto p-5"
        >
            <Link
                to={urlLink}
            style={{"color": lineColor}}

                className={`${location.pathname === urlLink ? "text-black font-extrabold" : "text-black"
                    }  font-bold transition duration-300 w-full h-auto`}
                onClick={() => {
                    setIsMenuToggled(false);
                }
                }
            >

                {page}
            </Link>
        </motion.div>
    );
};

const LinkTemplate = ({ urlLink, page }) => {
    const location = useLocation();
    return (
        <Link
            to={urlLink}
            className={`${location.pathname == urlLink ? "text-[#142D55]" : "text-black"
                }  transition duration-300 hover:text-ptskyBlue`}
        >
            {page}
        </Link>
    );
};



const Navbar = () => {
    const [isMenuToggled, setIsMenuToggled] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 1120px)");

    const modalRef = useRef(null);

    const closeModal = (e) => {
        e.stopPropagation();
        if (e.target == modalRef.current) {
            setIsMenuToggled(!isMenuToggled)
        }
    }

    return (
        <nav className={`bg-white flex flex-col z-40 w-full shadow-lg`} >

            <div className="flex items-center justify-between mx-auto w-5/6">

                <Link className='saturate-200 duration-200 flex justify-center items-center h-14 w-20 sm:h-20 sm:w-32 text-xl 2xl:text-2xl text-black font-bold' to={'/'}>

                    <img src="cgm.png" className=" h-10 w-10 sm:h-16 sm:w-16 rounded-full hover:saturate-150 transition duration-300" alt="" />



                </Link>
                {/* DESKTOP NAV */}
                {isDesktop ? (
                    <div className={`text-xl 2xl:text-2xl flex justify-between gap-10 2xl:gap-16 font-semibold`}>

                        <LinkTemplate
                            urlLink='/A11'
                            page="A11"
                        />
                        <LinkTemplate
                            urlLink='/A111'
                            page="A111"
                        />
                        <LinkTemplate
                            urlLink='/TB11'
                            page="TB11"
                        />
                        <LinkTemplate
                            urlLink='/TM8'
                            page="TM8"
                        />
                        <LinkTemplate
                            urlLink='/TM10'
                            page="TM10"
                        />
                    </div>
                ) : (
                    <button
                        className="rounded-full text-black p-2"
                        onClick={() => setIsMenuToggled(!isMenuToggled)}
                        aria-label="menu"
                    >
                        <GiHamburgerMenu size={24} />
                    </button>
                )}

                {/* MOBILE MENU POPUP */}
                {!isDesktop && isMenuToggled && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
                        onClick={closeModal}
                        ref={modalRef}
                    >
                        <motion.div
                            className="fixed right-0 bottom-0 h-full bg-black w-[340px]"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.3 }}
                            variants={{
                                hidden: { opacity: 0, x: 50 },
                                visible: { opacity: 1, x: 0 },
                            }}
                        >
                            {/* CLOSE ICON */}
                            <div className="flex justify-end p-12">
                                <button
                                    onClick={() => setIsMenuToggled(!isMenuToggled)}
                                    aria-label="close"
                                >
                                    <AiOutlineClose size={24} className="text-neutral-600" />
                                </button>
                            </div>

                            {/* MENU ITEMS */}
                            <motion.div
                                className="flex flex-col gap-10 ml-[33%] text-2xl text-white"
                                variants={container}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                            >


                                    <LinkMobileTemplate
                                        urlLink='/A11'
                                        page="A11"
                                        setIsMenuToggled={setIsMenuToggled}
                                        lineColor={'#ca8a04'}
                                    />


                                    <LinkMobileTemplate
                                        urlLink='/A111'
                                        page="A111"
                                        setIsMenuToggled={setIsMenuToggled}
                                        lineColor="#dc2626"
                                    />

                                    <LinkMobileTemplate
                                        urlLink='/TB11'
                                        page="TB11"
                                        setIsMenuToggled={setIsMenuToggled}
                                        lineColor="#ea580c"

                                    />


                                    <LinkMobileTemplate
                                        urlLink='/TM8'
                                        page="TM8"
                                        setIsMenuToggled={setIsMenuToggled}
                                        lineColor="#6b21a8"

                                    />
 

                                    <LinkMobileTemplate
                                        urlLink='/TM10'
                                        page="TM10"
                                        setIsMenuToggled={setIsMenuToggled}
                                        lineColor="#4b5563"
                                    />
                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;