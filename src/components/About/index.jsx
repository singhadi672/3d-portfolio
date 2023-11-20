import { Suspense, useState } from "react";
import ImageKitWrapper from "../commonComponents/Imagekit";
import { useEffect } from "react";
import axios from "axios";
import { aboutMe, companyExperience, experience, home } from "../../../apiService";
import Loader from "../Loader/plainLoader";
import { useNavigate } from "react-router-dom";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { colorscheme } from "../../../constants";
import Footer from "../Footer";

export default function About() {

    const [logoData, setLogoData] = useState([])
    const [userData, setUserData] = useState([])
    const [CompanyExperienceData, setCompanyExperienceData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getExperience();
        getAbout()
        getCompanyExperience()
    }, [])

    async function getExperience() {
        try {
            const response = await axios.get(import.meta.env.VITE_BASE_URL + experience())
            if (response?.data?.success) {
                setLogoData(response?.data?.data)
            }

        } catch (error) {
            console.log(error)
        }
    }
    async function getAbout() {
        try {
            const response = await axios.get(import.meta.env.VITE_BASE_URL + aboutMe())
            if (response?.data?.success) {
                setUserData(response?.data?.data)
            }

        } catch (error) {
            console.log(error)
        }
    }
    async function getCompanyExperience() {
        try {
            const response = await axios.get(import.meta.env.VITE_BASE_URL + companyExperience())
            if (response?.data?.success) {
                setCompanyExperienceData(response?.data?.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="w-full h-full lg:py-40 pt-20 pb-10 lg:px-40 px-4">
                <h2 className="text-6xl font-bold lg:leading-loose leading-12">Hello, I'm <span className="text-hero_highlight-dark">Aditya</span></h2>
                <Suspense fallback={<Loader />}>
                    <div className=" w-[100%] text-left self-center lg:self-start mt-5 lg:mt-0">
                        <p className="text-hero_text-dark lg:w-[90%] w-[100%] lg:text-md md:text-lg text-sm">{userData?.description}</p>
                        <div className="flex lg:justify-between justify-center items-center lg:w-3/12 w-[100%] mt-10">
                            <button className="bg-hero_actions-dark p-2 w-[8rem] rounded text-lg lg:mx-0 mx-4 text-w"
                                onClick={() => navigate("/connect")}
                            >
                                HIRE ME
                            </button>
                            <a href={userData?.resume} download={true} target="_blank" className="lg:mx-0 mx-4 border text-center border-hero_actions-dark p-2 w-[8rem] rounded text-lg text-hero_actions-dark">RESUME</a>
                        </div>
                    </div>
                </Suspense>
                <h3 className="mt-10 lg:text-2xl text-xl font-bold">My Skills</h3>
                <div className="grid lg:grid-cols-4 grid-cols-3 gap-y-10 place-content-center mt-10" >
                    {logoData?.map((logo, idx) =>
                        <div className="flex flex-col justify-center items-center relative ">
                            <div className="absolute w-[4rem] h-[4rem] p-2 lg:h-[6.5rem] lg:p-4 lg:w-[6.5rem] shadow-md rotate-6 top-0 lg:left-[32%] left-6 rounded-2xl hover:rotate-0 ease-in-out duration-300"></div>
                            <ImageKitWrapper className="rounded-2xl cursor-pointer w-[4rem] p-2 lg:w-[6rem] lg:h-[6rem]" path={logo?.technology_image} width={100} height={100} />
                            <p className="text-hero_text-dark mt-5 cursor-pointer text-xs lg:text-lg" >{logo?.technology_name}</p>
                        </div>
                    )}
                </div>
                <h3 className="mt-10 lg:text-2xl text-xl font-bold">My Experience</h3>
                <p className="text-hero_text-dark lg:w-[90%] w-[100%] lg:text-md md:text-lg text-sm my-7">I have worked with all sorts of Companies,levelling up my skillset and teaming up with smart people.Here is the rundown</p>
                <VerticalTimeline lineColor="#666768">

                    {CompanyExperienceData?.length > 0 && CompanyExperienceData?.map((item, idx) => <VerticalTimelineElement
                        contentStyle={{ borderBottom: `15px solid ${colorscheme[idx]}`, boxShadow: "1px 1px 10px #666768", borderRadius: '10px' }}
                        // contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                        date={`${item?.start_date} - ${item?.end_date ? item?.end_date : "Present"}`}
                        iconStyle={{ background: colorscheme[idx] }}
                        icon={<ImageKitWrapper className="rounded-full lg:w-[2.5rem] w-[1.5rem] absolute lg:top-2.5 lg:left-2.5 left-2 top-2" path={item?.company_logo} width={100} height={100} />}
                    >
                        <h3 className="font-bold text-xl">{item?.designation}</h3>
                        <h4 className="text-sm">{item?.company_name}</h4>
                        <div className="mt-5">
                            {item?.description?.map(desc => <li className="text-rundown">{desc}</li>)}
                        </div>
                    </VerticalTimelineElement>)}
                </VerticalTimeline>
            </div>
            <Footer />
        </>
    )
}