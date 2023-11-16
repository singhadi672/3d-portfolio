import { useGLTF } from "@react-three/drei"
import SkyScene from '../assets/3d/sky.glb'
import { useRef } from 'react'
import { useFrame } from "@react-three/fiber"

export default function Sky({ isRotating, setIsRotating }) {

    useFrame((_, delta) => {
        if (isRotating) {
            skyRef.current.rotation.y += 0.25 * delta
        }
    })

    const sky = useGLTF(SkyScene)
    const skyRef = useRef()
    return (
        <mesh ref={skyRef}>
            <primitive object={sky.scene} />
        </mesh>
    )
}