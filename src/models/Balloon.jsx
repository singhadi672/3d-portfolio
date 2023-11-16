import { useAnimations, useGLTF } from "@react-three/drei"
import BallonScene from '../assets/3d/hot_air_balloon.glb'
import { useRef, useEffect } from "react"

export default function Balloon({ isRotating, ...props }) {

    const ref = useRef()
    const { scene, animations } = useGLTF(BallonScene)
    const { actions } = useAnimations(animations, ref)

    useEffect(() => {
        if (isRotating) {
            ref.current.position.y += 0.5
        } else {
            ref.current.position.y = -3

        }
    }, [isRotating, actions])
    return (
        <group {...props} ref={ref}>
            <mesh>
                <primitive object={scene} />
            </mesh>
        </group>
    )
}