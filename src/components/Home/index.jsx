import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from 'react'
import Island from "../../models/Island";
import Loader from "../Loader";
import Sky from "../../models/Sky";

import Balloon from "../../models/Balloon";

export default function Home() {

    function adjustelementSize() {
        let scale = null;
        let position = [0, -20, -120]
        let rotation = [0.2, -3.75, 0]

        if (window.innerWidth < 768) {
            scale = [0.6, 0.6, 0.6]
            position = [0, 0, -120]
        }
        else {
            scale = [0.9, 0.9, 0.9]
        }

        return { scale, position, rotation }
    }

    function adjustelementSizeBalloon() {
        let scale = [0.007, 0.007, 0.007];
        let position = [0, -4, -4]
        // let rotation = [0.2, -3.75, 0]

        if (window.innerWidth < 768) {
            // scale = [0.6, 0.6, 0.6]
            position = [0, -2, -15]
        }

        return { scale, position }
    }

    const [elementDimensions, setElementDimensions] = useState(adjustelementSize())
    const [elementDimensionsBalloon, setElementDimensionsBalloon] = useState(adjustelementSizeBalloon())
    const [rotating, setRotating] = useState(false)
    const [currentStage, setCurrentStage] = useState(2)

    return (
        <div className="w-full h-screen flex-col flex justify-center items-center">

            {currentStage == 3 &&
                <div className="p-2 rounded-lg lg:w-[25rem] w-[90%] absolute lg:top-[60%] lg:right-16 top-[65%] text-lg lg:text-xl sm:leading-snug text-center" style={{ zIndex: 22 }}>
                    <div className="info_box rounded-lg pb-10">
                    </div>
                    <div className="info_box_shadow p-3 rounded-lg pb-10">
                        <p className="text-lg">Explore my diverse portfolio in the Projects section — where creativity meets innovation. Witness my skills and passion in action. Dive in now!</p>
                    </div>
                    <div className="absolute top-[80%] lg:left-[32%] left-[30%]">
                        <button className="relative z-10 bg-hero_actions-dark white text-md p-3 rounded-lg text-w">View Projects</button>
                        <div className="absolute top-1 left-1 rounded-lg bg-hero_highlight-dark w-full h-full">
                        </div>
                    </div>
                </div>
            }
           
            {currentStage == 1 &&
                < div className="p-2 rounded-lg lg:w-[25rem] w-[90%] absolute lg:top-[60%] lg:left-16 top-[65%] text-lgl lg:text-xl sm:leading-snug text-center" style={{ zIndex: 22 }}>
                    <div className="info_box rounded-lg pb-10">
                    </div>
                    <div className="info_box_shadow p-3 rounded-lg pb-10">
                        <p className="text-lg">Let's connect and explore endless possibilities together. Reach out now!</p>
                    </div>
                    <div className="absolute top-[75%] left-[32%]">
                        <button className="relative z-10 bg-hero_actions-dark white text-md p-3 rounded-lg text-w">Contact Me!</button>
                        <div className="absolute top-1 left-1 rounded-lg bg-hero_highlight-dark w-full h-full">
                        </div>
                    </div>
                </div>
            }
            {currentStage == 4 &&
                < div className="p-2 rounded-lg lg:w-[25rem] w-[90%] absolute lg:top-32 lg:left-16 top-[65%]  text-lg lg:text-xl sm:leading-snug text-center" style={{ zIndex: 22 }}>
                    <div className="info_box rounded-lg pb-10">
                    </div>
                    <div className="info_box_shadow p-3 rounded-lg pb-10">
                        <p className="text-lg">Discover insights, inspiration, and knowledge! Dive into my captivating blogs for enriching content that awaits your curiosity. Explore now!</p>
                    </div>
                    <div className="absolute top-[80%] left-[32%]">
                        <button className="relative z-10 bg-hero_actions-dark white text-md p-3 rounded-lg text-w">View Blogs</button>
                        <div className="absolute top-1 left-1 rounded-lg bg-hero_highlight-dark w-full h-full">
                        </div>
                    </div>
                </div>
            }
            {currentStage == 2 && <div className="p-2 rounded-lg lg:w-[25rem] w-[90%] absolute lg:top-32 lg:right-16 top-[65%] text-lg lg:text-xl sm:leading-snug text-center" style={{ zIndex: 22 }}>
                <div className="info_box rounded-lg pb-10">
                </div>
                <div className="info_box_shadow p-3 rounded-lg pb-10">
                    <p className="mb-3 ">Hi i am <b>Aditya</b></p>
                    <p className="text-lg">I'm a tech enthusiast specializing in the MERN stack. </p>
                </div>
                <div className="absolute top-[80%] lg:left-[32%] left-[28%]">
                    <button className="relative z-10 bg-hero_actions-dark white text-md p-3 rounded-lg text-w">View Experience</button>
                    <div className="absolute top-1 left-1 rounded-lg bg-hero_highlight-dark w-full h-full">

                    </div>
                </div>
            </div>

            }

            <div className="w-full h-full absolute top-0 left-0">
                <Canvas
                    className={`w-1/2 h-1/2 absolute top-0 left-0 z-20 ${rotating ? 'cursor-grabbing' : 'cursor-grab'}`}
                    camera={{ near: 0.1, far: 1000 }}
                >
                    <Suspense fallback={<Loader />}>
                        <directionalLight position={[1, 1, 1]} intensity={2.5} />
                        <ambientLight intensity={1.5} />
                        <hemisphereLight groundColor={"#000"} intensity={1} />

                        <Sky isRotating={rotating} setIsRotating={setRotating} />
                        <Balloon
                            scale={elementDimensionsBalloon.scale}
                            position={elementDimensionsBalloon.position}
                            isRotating={rotating} setIsRotating={setRotating}
                        />
                        <Island
                            position={elementDimensions.position}
                            scale={elementDimensions.scale}
                            rotation={elementDimensions.rotation}
                            isRotating={rotating}
                            setIsRotating={setRotating}
                            setCurrentStage={setCurrentStage}
                            currentStage={currentStage}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    )
}