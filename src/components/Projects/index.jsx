import { useState } from "react";
import PortfolioSection from "./portfolioSection";
import { useEffect } from "react";
import { portfolio } from "../../../apiService";
import axios from "axios";
import Footer from "../Footer";


export default function Projects() {

    const [portfolioData, setportfolioData] = useState([])

    useEffect(() => {
        getPortfolio();
    }, [])

    async function getPortfolio() {
        try {
            const response = await axios.get(import.meta.env.VITE_BASE_URL + portfolio())
            if (response?.data?.success) {
                setportfolioData(response?.data?.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="w-full h-full lg:py-40 pt-20 pb-10 lg:px-40 px-6" >
                <h2 className="lg:text-2xl text-xl font-bold">My Projects</h2>
                <p className="text-hero_text-dark lg:w-[90%] w-[100%] lg:text-md md:text-lg text-sm my-7" >In the project section, I have showcased my innovative initiatives, highlighting achievements, challenges, and solutions. Dive into my portfolio to witness the impact of my dedicated efforts and creativity.</p>
                <div className="lg:mt-20 mt-10 relative">
                    {portfolioData?.length > 0 && portfolioData?.map((item, idx) =>
                        <PortfolioSection
                            projectName={`PROJECT ${idx + 1}`}
                            projectSubHeading={item?.project_name}
                            projectDescription={item?.project_description}
                            projectLink={item?.project_link}
                            codeLink={item?.source_link}
                            reverse={idx % 2 != 0}
                            projectImg={item?.project_image}
                        />)}
                </div>
            </div>
            <Footer />
        </>
    )
}