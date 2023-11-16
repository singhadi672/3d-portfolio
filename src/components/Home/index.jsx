import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from 'react'
import Island from "../../models/Island";
import Loader from "../Loader";
import Sky from "../../models/Sky";
import Bird from "../../models/Bird";
import Balloon from "../../models/Balloon";

export default function Home() {

    function adjustelementSize() {
        let scale = null;
        let position = [0, -10, -110]
        let rotation = [0.2, 8, 0]

        if (window.innerWidth < 768) {
            scale = [0.7, 0.7, 0.7]
        }
        else {
            scale = [0.8, 0.8, 0.8]
        }

        return { scale, position, rotation }
    }

    const [elementDimensions, setElementDimensions] = useState(adjustelementSize())
    const [rotating, setRotating] = useState(false)
    const [currentStage, setCurrentStage] = useState(0)

    return (
        <div className="w-full h-screen flex-col flex justify-center items-center">
            <div>hi</div>
            <div className="w-full h-full absolute top-0 left-0">
                <Canvas
                    className={`w-1/2 h-1/2 absolute top-0 left-0 ${rotating ? 'cursor-grabbing' : 'cursor-grab'}`}
                    camera={{ near: 0.1, far: 1000 }}
                >
                    <Suspense fallback={<Loader />}>
                        <directionalLight position={[1, 1, 1]} intensity={2.5} />
                        <ambientLight intensity={1.5} />
                        <hemisphereLight groundColor={"#000"} intensity={1} />

                        <Sky isRotating={rotating} setIsRotating={setRotating} />
                        <Balloon
                            scale={[0.007, 0.007, 0.007]}
                            position={[0, -3, -4]}
                            isRotating={rotating} setIsRotating={setRotating}
                        />
                        <Island
                            position={elementDimensions.position}
                            scale={elementDimensions.scale}
                            rotation={elementDimensions.rotation}
                            isRotating={rotating}
                            setIsRotating={setRotating}
                            setCurrentStage={setCurrentStage}
                        />
                        {/* <Sky /> */}
                    </Suspense>
                </Canvas>
            </div>
        </div>
    )
}