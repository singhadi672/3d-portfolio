import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function BlogSection({ blogHeading, blogContent, blogLink, idx }) {
    function getBorderPosition(idx) {
        switch (idx % 2) {
            case 0:
                return '-top-8 -left-4'
                break;
            case 1:
                return "-top-8 -right-4"
                break;
            default:
                return '-top-8 -left-4'
                break;
        }
    }
    return (
        <div className={`relative lg:w-[80%] w-[100%] text-left`}>
            <div className={`bg_gradient hover:bg_gradient_anti ease-in-out duration-300 transition-all absolute lg:w-[95%] w-[98%] rounded-3xl h-[104%] -top-2 lg:left-3 left-1`}></div>
            <div className="lg:mx-5 bg-[white] lg:py-5 lg:px-10 sm:mx-5 sm:py-5 sm:px-10 mx-2 pl-4 pt-4 rounded-3xl z-10 relative lg:h-[30rem] h-[28rem] lg:h-[27rem] overflow-y-auto">
                <h3 className="lg:text-2xl text-xl font-bold mb-5">{blogHeading}</h3>
                <p className="text-hero_text-dark text-sm lg:text-md mb-5">{blogContent}</p>
                <div className="">
                    <FontAwesomeIcon icon={faArrowRight} className="mr-5 mt-2" />
                    <a href={blogLink} target="_blank">view blog</a>
                </div>
            </div>
        </div>
    )
}