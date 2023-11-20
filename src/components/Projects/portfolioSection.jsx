import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ImageKitWrapper from "../commonComponents/Imagekit";
import { Suspense } from "react";
import PlainLoader from "../Loader/plainLoader";

export default function PortfolioSection({ reverse = false, projectName, projectSubHeading, projectDescription, projectLink, codeLink, projectImg }) {
    return (
        <Suspense fallback={<PlainLoader />}>
            <div className={`flex lg:justify-between justify-center flex-col ${reverse ? 'lg:flex-row-reverse' : "lg:flex-row"} items-center lg:mt-20 mt-10`}>
                <div className="lg:w-[50%] w-[100%] text-left z-10">
                    <h3 className="text-hero_highlight-dark lg:text-2xl text-xl mb-4">{projectName}</h3>
                    <a className="lg:text-3xl text-2xl lg:mb-0 mb-4 font-semibold" href={projectLink} target="_blank">{projectSubHeading}</a>
                    <div className="relative lg:hidden mt-4">
                        <div className="relative rounded-2xl" style={{ zIndex: 2 }}>
                            <ImageKitWrapper className="rounded-2xl shadow-2xl" path={projectImg} width={450} height={400} />
                        </div>
                        <div className="absolute w-full h-full sm:w-[450px] sm:h-[210px] sm:left-5 sm:top-7 md:w-[450px] md:h-[210px] md:top-10 md:left-5 lg:border-8 border-4 border-hero_highlight-dark lg:top-10 lg:right-10 top-5 right-5 rounded-2xl">
                        </div>
                    </div>
                    <p className="text-hero_text-dark lg:mt-5 mt-10">{projectDescription}</p>
                    <div className="flex justify-start items-center mt-5">
                        <FontAwesomeIcon icon={faArrowRight} className="mr-5 mt-2" />
                        <a href={codeLink} target="_blank">view source</a>
                    </div>
                </div>
                <div className="relative hidden lg:inline">
                    <div className="relative rounded-2xl" style={{ zIndex: 2 }}>
                        <ImageKitWrapper className="rounded-2xl shadow-2xl" path={projectImg} width={450} height={400} />
                    </div>
                    <div className="absolute w-full h-full border-8 border-hero_highlight-dark top-10 right-10 rounded-2xl">
                    </div>
                </div>
            </div>
        </Suspense>
    )
}