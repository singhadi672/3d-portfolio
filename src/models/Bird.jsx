import { useGLTF } from "@react-three/drei"
import BirdScene from '../assets/3d/bird.glb'

export default function Bird({ props }) {

    const { scene, animations } = useGLTF(BirdScene)
    return (
        <mesh >
            <primitive object={scene} />
        </mesh>
    )
}