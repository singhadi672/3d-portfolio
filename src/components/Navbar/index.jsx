import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navbarTitles } from "../../../constants";
import ImageKitWrapper from "../commonComponents/Imagekit";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate()

    return (
        <div className="text-white flex justify-end items-center fixed top-0 left-0 w-full py-3 px-3 backdrop-blur-lg" style={{ zIndex: 22 }}>
            <div className="absolute lg:-left-7 lg:-top-2 top-2 -left-3 w-[5.5rem] lg:w-auto cursor-pointer" onClick={() => navigate('/')}>
                <ImageKitWrapper path={"/portfolio_logo_colour.svg"} width={150} />
            </div>
            <div className="flex justify-between items-center lg:w-[40%] w-[80%] text-sm lg:text-md mt-3 z-10">
                {navbarTitles?.map(title => <h6 className="mx-3 cursor-pointer hover:text-w text-hero_dark mb-2" onClick={() => navigate(title.link)} >{title.name}</h6>)}
            </div>
        </div >
    )
}