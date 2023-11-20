import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import IslandScene from '../assets/3d/island.glb'
import { a } from '@react-spring/three'


export default function Island({ isRotating, setIsRotating, setCurrentStage, currentStage, ...props }) {
    const { nodes, materials } = useGLTF(IslandScene);

    const islandRef = useRef()
    const { gl, viewport } = useThree()

    const lastx = useRef(0)
    const rotationSpeed = useRef(0)
    const damping = 0.95


    useFrame(() => {
        if (!isRotating) {
            rotationSpeed.current *= damping
            if (Math.abs(rotationSpeed.current < 0.00001)) {
                rotationSpeed.current = 0
            }

            islandRef.current.rotation.y += rotationSpeed.current

        } else {
            const rotation = islandRef.current.rotation.y

            /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
            */
            const normalizedRotation =
                ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

            // Set the current stage based on the island's orientation
            switch (true) {
                case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
                    setCurrentStage(4);
                    break;
                case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
                    setCurrentStage(3);
                    break;
                case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
                    setCurrentStage(2);
                    break;
                case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
                    setCurrentStage(1);
                    break;
                default:
                    setCurrentStage(null);
            }
        }
    })

    function handlePointerDown(e) {
        e.stopPropagation();
        e.preventDefault();
        setIsRotating(true)

        const clientX = e?.touches ? e?.touches[0].clientX : e?.clientX
        lastx.current = clientX
    }

    function handlePointerUp(e) {
        e.stopPropagation();
        e.preventDefault();
        setIsRotating(false)

    }

    function handlePointerMove(e) {
        e.stopPropagation();
        e.preventDefault();

        if (isRotating) {
            const clientX = e?.touches ? e?.touches[0].clientX : e?.clientX
            const delta = (clientX - lastx.current) / viewport.width
            islandRef.current.rotation.y += delta * 0.01 * Math.PI
            lastx.current = clientX
            rotationSpeed.current = delta * 0.01 * Math.PI
        }
    }

    function handleKeyDown(e) {
        if (e.key == 'ArrowLeft') {
            if (!isRotating) {
                setIsRotating(true)
            }
            islandRef.current.rotation.y += 0.01 * Math.PI
            rotationSpeed.current = 0.0125
        } else if (e.key === 'ArrowRight') {
            if (!isRotating) {
                setIsRotating(true)
            }
            islandRef.current.rotation.y -= 0.01 * Math.PI
            rotationSpeed.current = -0.0125
        }
    }

    function handleKeyUp(e) {
        if (e.key == 'ArrowLeft' || e.key == 'ArrowRight') {
            if (isRotating) {
                setIsRotating(false)
            }
        }
    }


    useEffect(() => {
        const canvas = gl.domElement
        canvas.addEventListener('pointerup', handlePointerUp)
        canvas.addEventListener('pointerdown', handlePointerDown)
        canvas.addEventListener('pointermove', handlePointerMove)
        document.addEventListener('keyup', handleKeyUp)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            canvas.removeEventListener('pointerup', handlePointerUp)
            canvas.removeEventListener('pointerdown', handlePointerDown)
            canvas.removeEventListener('pointermove', handlePointerMove)
            document.removeEventListener('keyup', handleKeyUp)
            document.removeEventListener('keydown', handleKeyDown)

        }
    }, [gl, handlePointerDown, handlePointerUp, handlePointerMove])

    return (
        <a.group {...props} ref={islandRef}>
            <group
                position={[-36.773, 6.538, 16.547]}
                rotation={[3.14, -1.083, 3.14]}
            >
                <mesh
                    geometry={nodes.Object_6.geometry}
                    material={materials.tree_bark}
                />
                <mesh
                    geometry={nodes.Object_8.geometry}
                    material={materials.leaves}
                    position={[-6.085, 24.533, 16.858]}
                    rotation={[-2.191, 0.507, 2.744]}
                />
                <mesh


                    geometry={nodes.Object_10.geometry}
                    material={materials.leaves}
                    position={[7.701, 28.675, 12.685]}
                    rotation={[0.367, 0.516, -0.032]}
                />
                <mesh


                    geometry={nodes.Object_12.geometry}
                    material={materials.leaves}
                    position={[9.466, 27.167, 10.915]}
                    rotation={[-1.132, -0.791, -1.186]}
                />
                <mesh


                    geometry={nodes.Object_14.geometry}
                    material={materials.leaves}
                    position={[12.37, 17.614, 3.411]}
                    rotation={[-2.785, -0.782, -2.116]}
                />
                <mesh


                    geometry={nodes.Object_16.geometry}
                    material={materials.leaves}
                    position={[13.836, 15.788, 8.965]}
                    rotation={[2.164, 0.538, -1.843]}
                />
                <mesh


                    geometry={nodes.Object_18.geometry}
                    material={materials["leaves.001"]}
                    position={[11.774, 14.546, 11.037]}
                    rotation={[-1.584, -0.419, -2.151]}
                />
                <mesh


                    geometry={nodes.Object_20.geometry}
                    material={materials.leaves}
                    position={[13.97, 11.385, 9.784]}
                    rotation={[-1.492, -0.595, -1.6]}
                />
                <mesh


                    geometry={nodes.Object_22.geometry}
                    material={materials["leaves.001"]}
                    position={[5.534, 24.667, 14.265]}
                    rotation={[0.135, -0.01, 0.104]}
                />
                <mesh


                    geometry={nodes.Object_24.geometry}
                    material={materials.tree_bark}
                    position={[-0.322, 17.856, 8.95]}
                    rotation={[-1.261, 0.686, -0.012]}
                />
            </group>
            <group
                position={[-45.385, 8.643, -9.317]}
                rotation={[0.082, -1.052, 0.184]}
            >
                <mesh


                    geometry={nodes.Object_26.geometry}
                    material={materials["rocks.002"]}
                />
                <mesh


                    geometry={nodes.Object_27.geometry}
                    material={materials["rocks.003"]}
                />
            </group>
            <group
                position={[0.042, 8.557, 42.483]}
                rotation={[0.016, -0.851, -0.035]}
            >
                <mesh


                    geometry={nodes.Object_29.geometry}
                    material={materials.bark_2}
                />
                <mesh


                    geometry={nodes.Object_31.geometry}
                    material={materials.bark_2}
                    position={[6.951, 18.382, 6.204]}
                    rotation={[-2.812, 1.099, 2.25]}
                />
            </group>
            <group
                position={[-30.433, 8.865, 30.478]}
                rotation={[-1.41, -0.182, -2.308]}
            >
                <mesh


                    geometry={nodes.Object_33.geometry}
                    material={materials["rocks.002"]}
                />
                <mesh


                    geometry={nodes.Object_34.geometry}
                    material={materials["rocks.003"]}
                />
            </group>
            <group
                position={[-46.367, 8.827, -31.152]}
                rotation={[0.066, 1.329, -0.124]}
            >
                <mesh


                    geometry={nodes.Object_40.geometry}
                    material={materials["rocks.003"]}
                />
                <mesh


                    geometry={nodes.Object_41.geometry}
                    material={materials.rocks}
                />
                <group position={[0, -2.99, 0]} rotation={[0, -1.271, 0]}>
                    <mesh


                        geometry={nodes.Object_43.geometry}
                        material={materials["rocks.003"]}
                    />
                    <mesh


                        geometry={nodes.Object_44.geometry}
                        material={materials.rocks}
                    />
                </group>
                <group position={[0, -1.933, 0]} rotation={[0, -1.271, 0]}>
                    <mesh


                        geometry={nodes.Object_46.geometry}
                        material={materials["rocks.002"]}
                    />
                    <mesh


                        geometry={nodes.Object_47.geometry}
                        material={materials["rocks.003"]}
                    />
                </group>
                <mesh


                    geometry={nodes.Object_49.geometry}
                    material={materials["rocks.002"]}
                    position={[-1.408, -2.768, 0.446]}
                    rotation={[0.048, -0.002, 0.116]}
                />
                <mesh


                    geometry={nodes.Object_51.geometry}
                    material={materials["rocks.002"]}
                    position={[-1.274, -1.84, 0.11]}
                    rotation={[0.02, -0.564, 0.193]}
                />
                <mesh


                    geometry={nodes.Object_53.geometry}
                    material={materials["rocks.002"]}
                    position={[-0.55, -1.909, -1.205]}
                    rotation={[2.437, 0.673, -2.143]}
                />
            </group>
            <group
                position={[44.725, 7.058, -24.956]}
                rotation={[-2.462, 0.262, -2.885]}
            >
                <mesh


                    geometry={nodes.Object_83.geometry}
                    material={materials.bark3}
                />
                <mesh


                    geometry={nodes.Object_85.geometry}
                    material={materials.bark3}
                    position={[3.991, 6.125, 14.281]}
                    rotation={[-0.895, 0.55, 3.066]}
                />
            </group>
            <group position={[2.042, 61.728, -0.692]}>
                <mesh


                    geometry={nodes.Object_145.geometry}
                    material={materials["rocks.002"]}
                />
                <mesh


                    geometry={nodes.Object_146.geometry}
                    material={materials["rocks.003"]}
                />
                <group
                    position={[-0.758, 5.069, -3.95]}
                    rotation={[3.14, 0.016, -3.113]}
                >
                    <mesh


                        geometry={nodes.Object_153.geometry}
                        material={materials["rocks.002"]}
                    />
                    <mesh


                        geometry={nodes.Object_154.geometry}
                        material={materials["rocks.003"]}
                    />
                </group>
                <group position={[-2.21, 5.019, 3.348]} rotation={[0, -0.754, 0]}>
                    <mesh


                        geometry={nodes.Object_156.geometry}
                        material={materials["rocks.002"]}
                    />
                    <mesh


                        geometry={nodes.Object_157.geometry}
                        material={materials["rocks.003"]}
                    />
                </group>
                <group
                    position={[-3.947, 5.077, -0.736]}
                    rotation={[3.14, -1.166, 3.14]}
                >
                    <mesh


                        geometry={nodes.Object_159.geometry}
                        material={materials["rocks.002"]}
                    />
                    <mesh


                        geometry={nodes.Object_160.geometry}
                        material={materials["rocks.003"]}
                    />
                </group>
                <group
                    position={[-3.977, 0.769, 0.025]}
                    rotation={[3.14, -1.206, 3.14]}
                >
                    <mesh


                        geometry={nodes.Object_162.geometry}
                        material={materials["rocks.002"]}
                    />
                    <mesh


                        geometry={nodes.Object_163.geometry}
                        material={materials["rocks.003"]}
                    />
                </group>
                <group position={[-5.53, -3.537, 0.348]} rotation={[0, 0.486, 0]}>
                    <mesh


                        geometry={nodes.Object_165.geometry}
                        material={materials["rocks.002"]}
                    />
                    <mesh


                        geometry={nodes.Object_166.geometry}
                        material={materials["rocks.003"]}
                    />
                </group>
                <group position={[-5.715, -3.905, 0.058]} rotation={[0, 0.486, 0]}>
                    <mesh


                        geometry={nodes.Object_168.geometry}
                        material={materials["rocks.002"]}
                    />
                    <mesh


                        geometry={nodes.Object_169.geometry}
                        material={materials["rocks.003"]}
                    />
                </group>
                <group position={[-5.963, -4.267, -0.377]} rotation={[0, 0.486, 0]}>
                    <mesh


                        geometry={nodes.Object_171.geometry}
                        material={materials["rocks.002"]}
                    />
                    <mesh


                        geometry={nodes.Object_172.geometry}
                        material={materials["rocks.003"]}
                    />
                </group>
                <mesh


                    geometry={nodes.Object_148.geometry}
                    material={materials["rocks.002"]}
                />
                <mesh


                    geometry={nodes.Object_149.geometry}
                    material={materials["rocks.003"]}
                />
                <mesh


                    geometry={nodes.Object_151.geometry}
                    material={materials["rocks.003"]}
                    position={[-4.584, -2.078, 1.892]}
                    rotation={[0.01, 0.363, -0.005]}
                />
                <mesh


                    geometry={nodes.Object_174.geometry}
                    material={materials["rocks.002"]}
                    position={[-6.568, -4.694, -0.733]}
                    rotation={[0, 0.486, 0]}
                />
                <mesh


                    geometry={nodes.Object_176.geometry}
                    material={materials.material_0}
                    position={[-6.359, -1.567, 1.896]}
                    rotation={[-0.07, -1.516, -0.15]}
                />
                <mesh


                    geometry={nodes.Object_178.geometry}
                    material={materials.material_0}
                    position={[-5.778, -0.825, 3.238]}
                    rotation={[-0.596, -1.05, -2.186]}
                />
                <mesh


                    geometry={nodes.Object_180.geometry}
                    material={materials.bark3}
                    position={[12.723, -4.864, 6.27]}
                    rotation={[-3.14, -0.895, -3.14]}
                />
                <mesh


                    geometry={nodes.Object_182.geometry}
                    material={materials["rocks.002"]}
                    position={[0.026, 0.19, -0.058]}
                />
                <mesh


                    geometry={nodes.Object_184.geometry}
                    material={materials["rocks.002"]}
                    position={[-4.057, 3.845, -0.711]}
                    rotation={[0.04, 0.009, 0.091]}
                />
                <mesh


                    geometry={nodes.Object_186.geometry}
                    material={materials["rocks.001"]}
                    position={[-2.202, 3.846, 3.322]}
                    rotation={[3.131, -1.239, -3.115]}
                />
                <mesh


                    geometry={nodes.Object_188.geometry}
                    material={materials["rocks.002"]}
                    position={[-0.707, 3.809, -4.11]}
                    rotation={[0.11, -1.203, 0.194]}
                />
            </group>

            <group position={[-14.879, -3.715, 61.952]}>
                <mesh


                    geometry={nodes.Object_231.geometry}
                    material={materials["Material.005"]}
                />
                <mesh


                    geometry={nodes.Object_232.geometry}
                    material={materials["Material.006"]}
                />
            </group>
            <group
                position={[-16.418, 6.649, -57.221]}
                rotation={[-0.159, -0.14, 0.147]}
            >
                <mesh


                    geometry={nodes.Object_578.geometry}
                    material={materials.flower}
                />
                <mesh


                    geometry={nodes.Object_579.geometry}
                    material={materials["Material.001"]}
                />
                <mesh


                    geometry={nodes.Object_580.geometry}
                    material={materials["leaves.002"]}
                />
                <mesh


                    geometry={nodes.Object_581.geometry}
                    material={materials["leaves.001"]}
                />
            </group>
            <group
                position={[-0.427, 5.5, -56.782]}
                rotation={[-0.543, 0.305, 0.056]}
            >
                <mesh


                    geometry={nodes.Object_583.geometry}
                    material={materials["flower.002"]}
                />
                <mesh


                    geometry={nodes.Object_584.geometry}
                    material={materials["Material.001"]}
                />
                <mesh


                    geometry={nodes.Object_585.geometry}
                    material={materials["leaves.002"]}
                />
                <mesh


                    geometry={nodes.Object_586.geometry}
                    material={materials["leaves.001"]}
                />
            </group>
            <group
                position={[25.178, 5.377, -46.814]}
                rotation={[-0.694, 0.692, 0.365]}
            >
                <mesh


                    geometry={nodes.Object_588.geometry}
                    material={materials.flower}
                />
                <mesh


                    geometry={nodes.Object_589.geometry}
                    material={materials["Material.001"]}
                />
                <mesh


                    geometry={nodes.Object_590.geometry}
                    material={materials["leaves.002"]}
                />
                <mesh


                    geometry={nodes.Object_591.geometry}
                    material={materials["leaves.001"]}
                />
            </group>
            <group
                position={[11.83, 56.32, -3.564]}
                rotation={[-0.694, 0.692, 0.365]}
            >
                <mesh


                    geometry={nodes.Object_593.geometry}
                    material={materials.flower}
                />
                <mesh


                    geometry={nodes.Object_594.geometry}
                    material={materials["Material.001"]}
                />
                <mesh


                    geometry={nodes.Object_595.geometry}
                    material={materials["leaves.002"]}
                />
                <mesh


                    geometry={nodes.Object_596.geometry}
                    material={materials["leaves.001"]}
                />
            </group>
            <group
                position={[-12.948, 41.929, -9.037]}
                rotation={[-0.386, 0.5, 0.482]}
            >
                <mesh


                    geometry={nodes.Object_598.geometry}
                    material={materials["flower.001"]}
                />
                <mesh


                    geometry={nodes.Object_599.geometry}
                    material={materials["Material.001"]}
                />
                <mesh


                    geometry={nodes.Object_600.geometry}
                    material={materials["leaves.002"]}
                />
                <mesh


                    geometry={nodes.Object_601.geometry}
                    material={materials["leaves.001"]}
                />
            </group>
            <group
                position={[-3.955, 56.529, -6.364]}
                rotation={[-0.386, 0.5, 0.482]}
            >
                <mesh


                    geometry={nodes.Object_603.geometry}
                    material={materials["flower.001"]}
                />
                <mesh


                    geometry={nodes.Object_604.geometry}
                    material={materials["Material.001"]}
                />
                <mesh


                    geometry={nodes.Object_605.geometry}
                    material={materials["leaves.002"]}
                />
                <mesh


                    geometry={nodes.Object_606.geometry}
                    material={materials["leaves.001"]}
                />
            </group>
            <group
                position={[-7.668, 49.339, -9.981]}
                rotation={[-0.667, 0.286, 0.771]}
            >
                <mesh


                    geometry={nodes.Object_608.geometry}
                    material={materials["flower.001"]}
                />
                <mesh


                    geometry={nodes.Object_609.geometry}
                    material={materials["Material.001"]}
                />
                <mesh


                    geometry={nodes.Object_610.geometry}
                    material={materials["leaves.002"]}
                />
                <mesh


                    geometry={nodes.Object_611.geometry}
                    material={materials["leaves.001"]}
                />
            </group>
            <mesh


                geometry={nodes.Object_4.geometry}
                material={materials["rocks.003"]}
                position={[-48.606, 6.45, 13.052]}
                rotation={[-3.138, -0.513, 3.11]}
            />
            <mesh


                geometry={nodes.Object_36.geometry}
                material={materials["rocks.001"]}
                position={[-54.103, 5.256, -5.999]}
                rotation={[-0.141, 0.541, 0.079]}
            />
            <mesh


                geometry={nodes.Object_38.geometry}
                material={materials.pillar}
                position={[-52.458, 5.563, -6.101]}
                rotation={[0.201, -1.008, 0.162]}
            />
            <mesh


                geometry={nodes.Object_55.geometry}
                material={materials.pillar}
                position={[-53.29, 5.396, -4.73]}
                rotation={[-0.091, 0.537, 0.174]}
            />
            <mesh


                geometry={nodes.Object_57.geometry}
                material={materials.pillar}
                position={[-53.21, 5.427, -7.37]}
                rotation={[-0.047, 0.515, 0.184]}
            />
            <mesh


                geometry={nodes.Object_59.geometry}
                material={materials.pillar}
                position={[-51.473, 5.423, 7.256]}
                rotation={[-0.078, 0.547, -0.073]}
            />
            <mesh


                geometry={nodes.Object_61.geometry}
                material={materials["rocks.001"]}
                position={[-49.802, 5.513, 7.165]}
                rotation={[-0.022, -1.029, -0.083]}
            />
            <mesh


                geometry={nodes.Object_63.geometry}
                material={materials["rocks.001"]}
                position={[-50.659, 5.476, 8.53]}
                rotation={[-0.03, 0.535, 0.023]}
            />
            <mesh


                geometry={nodes.Object_65.geometry}
                material={materials.pillar}
                position={[-50.555, 5.456, 5.89]}
                rotation={[0.011, 0.509, 0.036]}
            />
            <mesh


                geometry={nodes.Object_67.geometry}
                material={materials.pillar}
                position={[-48.998, 5.489, 8.394]}
                rotation={[-0.009, 0.524, -0.028]}
            />
            <mesh


                geometry={nodes.Object_69.geometry}
                material={materials["rocks.001"]}
                position={[-47.382, 5.436, 8.281]}
                rotation={[-0.022, -1.029, -0.083]}
            />
            <mesh


                geometry={nodes.Object_71.geometry}
                material={materials.pillar}
                position={[-48.264, 5.476, 9.722]}
                rotation={[-0.03, 0.535, 0.023]}
            />
            <mesh


                geometry={nodes.Object_73.geometry}
                material={materials.pillar}
                position={[-48.069, 5.415, 6.987]}
                rotation={[0.011, 0.509, 0.036]}
            />
            <mesh


                geometry={nodes.Object_75.geometry}
                material={materials["rocks.001"]}
                position={[-53.221, 5.385, 10.09]}
                rotation={[-0.078, 0.547, -0.073]}
            />
            <mesh


                geometry={nodes.Object_77.geometry}
                material={materials.pillar}
                position={[-51.55, 5.475, 9.999]}
                rotation={[-0.022, -1.029, -0.083]}
            />
            <mesh


                geometry={nodes.Object_79.geometry}
                material={materials.pillar}
                position={[-52.407, 5.438, 11.365]}
                rotation={[-0.03, 0.535, 0.023]}
            />
            <mesh


                geometry={nodes.Object_81.geometry}
                material={materials.pillar}
                position={[-52.302, 5.418, 8.725]}
                rotation={[0.011, 0.509, 0.036]}
            />
            <mesh


                geometry={nodes.Object_87.geometry}
                material={materials["rocks.001"]}
                position={[-49.933, 6.439, -6.523]}
                rotation={[-0.187, 0.54, 0.308]}
            />
            <mesh


                geometry={nodes.Object_89.geometry}
                material={materials["rocks.001"]}
                position={[-48.383, 7.065, -6.642]}
                rotation={[0.519, -0.91, 0.459]}
            />
            <mesh


                geometry={nodes.Object_91.geometry}
                material={materials.pillar}
                position={[-49.115, 6.646, -5.267]}
                rotation={[-0.137, 0.545, 0.403]}
            />
            <mesh


                geometry={nodes.Object_93.geometry}
                material={materials.pillar}
                position={[-49.142, 6.874, -7.899]}
                rotation={[-0.131, 0.502, 0.335]}
            />
            <mesh


                geometry={nodes.Object_95.geometry}
                material={materials.pillar}
                position={[-47.349, 7.215, -5.511]}
                rotation={[-0.113, 0.561, 0.289]}
            />
            <mesh


                geometry={nodes.Object_97.geometry}
                material={materials.bones}
                position={[-16.769, 8.447, -43.704]}
                rotation={[-0.478, 1.205, 0.307]}
            />
            <mesh


                geometry={nodes.Object_99.geometry}
                material={materials.bones}
                position={[-16.495, 8.106, -45.35]}
                rotation={[-0.478, 1.205, 0.307]}
            />
            <mesh


                geometry={nodes.Object_101.geometry}
                material={materials.bones}
                position={[-15.888, 7.817, -46.724]}
                rotation={[-0.763, 1.3, 0.53]}
            />
            <mesh


                geometry={nodes.Object_103.geometry}
                material={materials.bones}
                position={[-16.055, 7.706, -48.502]}
                rotation={[-0.229, 1.382, -0.07]}
            />
            <mesh


                geometry={nodes.Object_105.geometry}
                material={materials.bones}
                position={[-16.103, 7.496, -51.289]}
                rotation={[0.193, 1.256, -0.479]}
            />
            <mesh


                geometry={nodes.Object_107.geometry}
                material={materials.bones}
                position={[-16.758, 7.038, -53.076]}
                rotation={[-0.229, 1.382, -0.07]}
            />
            <mesh


                geometry={nodes.Object_109.geometry}
                material={materials.bones}
                position={[-17.651, 6.186, -55.122]}
                rotation={[2.276, 1.457, -2.814]}
            />
            <mesh


                geometry={nodes.Object_111.geometry}
                material={materials.bones}
                position={[-18.599, 5.259, -57.149]}
                rotation={[-2.899, 1.507, 2.429]}
            />
            <mesh


                geometry={nodes.Object_113.geometry}
                material={materials.bones}
                position={[-20.753, 4.338, -61.366]}
                rotation={[2.257, 1.473, -2.796]}
            />
            <mesh


                geometry={nodes.Object_115.geometry}
                material={materials.bones}
                position={[-18.889, 5.102, -59.292]}
                rotation={[1.392, 1.447, -1.772]}
            />
            <mesh


                geometry={nodes.Object_117.geometry}
                material={materials.bones}
                position={[-21.258, 4.099, -62.843]}
                rotation={[1.908, 1.409, -2.273]}
            />
            <mesh


                geometry={nodes.Object_119.geometry}
                material={materials.bones}
                position={[-22.889, 3.393, -64.117]}
                rotation={[-2.59, 1.403, 2.409]}
            />
            <mesh


                geometry={nodes.Object_121.geometry}
                material={materials.bones}
                position={[-28.91, 5.731, -48.79]}
                rotation={[0.842, -1.493, 0.883]}
            />
            <mesh


                geometry={nodes.Object_123.geometry}
                material={materials.bones}
                position={[-27.967, 6.493, -46.186]}
                rotation={[0.608, -1.307, 0.515]}
            />
            <mesh


                geometry={nodes.Object_125.geometry}
                material={materials.bones}
                position={[-26.392, 7.093, -44.334]}
                rotation={[0.608, -1.307, 0.515]}
            />
            <mesh


                geometry={nodes.Object_127.geometry}
                material={materials.bones}
                position={[-33.086, 3.332, -56.377]}
                rotation={[2.509, -1.458, 2.545]}
            />
            <mesh


                geometry={nodes.Object_129.geometry}
                material={materials.rocks}
                position={[55.1, 6.662, -0.399]}
                rotation={[-0.058, -0.917, -0.173]}
            />
            <mesh


                geometry={nodes.Object_131.geometry}
                material={materials["rocks.001"]}
                position={[55.284, 6.013, 3.254]}
                rotation={[-3.075, -0.449, -2.753]}
            />
            <mesh


                geometry={nodes.Object_133.geometry}
                material={materials["rocks.001"]}
                position={[52.433, 6.248, 1.321]}
                rotation={[3.138, -1.228, 2.979]}
            />
            <mesh


                geometry={nodes.Object_135.geometry}
                material={materials["rocks.001"]}
                position={[6.394, 17.958, -33.249]}
                rotation={[-0.344, -0.726, -0.059]}
            />
            <mesh


                geometry={nodes.Object_137.geometry}
                material={materials.rocks}
                position={[3.039, 17.013, -33.222]}
                rotation={[3.103, -0.354, 0.267]}
            />
            <mesh


                geometry={nodes.Object_139.geometry}
                material={materials.rocks}
                position={[32.018, 8.51, 32.329]}
                rotation={[3.044, -1.22, 3.101]}
            />
            <mesh


                geometry={nodes.Object_141.geometry}
                material={materials["rocks.001"]}
                position={[31.028, 7.173, 36.961]}
                rotation={[0.972, 1.311, 2.254]}
            />
            <mesh


                geometry={nodes.Object_143.geometry}
                material={materials.bark3}
                position={[5.527, 29.975, 21.199]}
                rotation={[-2.333, 0.617, -2.679]}
            />
            <mesh


                geometry={nodes.Object_190.geometry}
                material={materials.pillar}
                position={[-48.335, 5.707, 2.827]}
                rotation={[0.082, -0.021, 0.005]}
            />
            <mesh


                geometry={nodes.Object_192.geometry}
                material={materials.pillar}
                position={[-41.547, 6.947, 26.178]}
            />
            <mesh


                geometry={nodes.Object_194.geometry}
                material={materials.pillar}
                position={[-52.494, 6.064, -20.84]}
                rotation={[0.01, -0.018, 0.045]}
            />
            <mesh


                geometry={nodes.Object_205.geometry}
                material={materials.rocks}
                position={[-33.218, 10.751, 17.88]}
                rotation={[0.125, 0.119, 0.25]}
            />
            <mesh


                geometry={nodes.Object_207.geometry}
                material={materials["rocks.001"]}
                position={[-18.065, 12.48, 34.021]}
                rotation={[2.914, -1.179, 2.858]}
            />
            <mesh


                geometry={nodes.Object_209.geometry}
                material={materials.material_0}
                position={[-10.333, 10.844, 33.594]}
                rotation={[1.157, -1.241, -0.849]}
            />
            <mesh


                geometry={nodes.Object_211.geometry}
                material={materials["rocks.001"]}
                position={[-31.641, 12.833, 10.918]}
                rotation={[0, 1.234, 0]}
            />
            <mesh


                geometry={nodes.Object_213.geometry}
                material={materials["rocks.001"]}
                position={[38.682, 9.513, -23.912]}
                rotation={[0.338, 0.001, 1.147]}
            />
            <mesh


                geometry={nodes.Object_215.geometry}
                material={materials.rocks}
                position={[39.922, 11.005, -17.435]}
                rotation={[0.135, -0.398, 0.317]}
            />
            <mesh


                geometry={nodes.Object_217.geometry}
                material={materials.bark_2}
                position={[-40.323, 8.363, -17.777]}
                rotation={[2.348, -1.164, 2.193]}
            />
            <mesh


                geometry={nodes.Object_219.geometry}
                material={materials.bark_2}
                position={[4.8, 53.747, 12.318]}
                rotation={[0.534, -0.92, 0.322]}
            />
            <mesh


                geometry={nodes.Object_221.geometry}
                material={materials.tree_bark}
                position={[-22.827, 25.683, -0.951]}
                rotation={[-0.051, 0.401, 0.512]}
            />
            <mesh


                geometry={nodes.Object_223.geometry}
                material={materials.bark3}
                position={[19.64, 6.475, 46.29]}
                rotation={[2.982, 0.351, -2.981]}
            />
            <mesh


                geometry={nodes.Object_225.geometry}
                material={materials.bark3}
                position={[18.027, 6.475, 46.136]}
                rotation={[0.171, -0.508, 0.189]}
            />
            <mesh


                geometry={nodes.Object_227.geometry}
                material={materials.bark_2}
                position={[-8.089, 47.747, 9.648]}
                rotation={[-3.136, -0.4, 2.456]}
            />
            <mesh


                geometry={nodes.Object_229.geometry}
                material={materials.bark_2}
                position={[12.121, 56.291, 0.638]}
                rotation={[2.491, -1.011, -3.121]}
            />
            <mesh


                geometry={nodes.Object_234.geometry}
                material={materials.tree_bark}
                position={[24.85, 8.315, -40.216]}
                rotation={[0.367, -1.162, 0.175]}
            />
            <mesh


                geometry={nodes.Object_236.geometry}
                material={materials.bark_2}
                position={[2.393, 39.328, -16.989]}
                rotation={[1.372, -1.405, 1.614]}
            />

            <mesh


                geometry={nodes.Object_240.geometry}
                material={materials.leaves}
                position={[20.941, 55.434, 32.738]}
            />
            <mesh


                geometry={nodes.Object_242.geometry}
                material={materials["leaves.002"]}
                position={[2.522, 28.154, 58.03]}
                rotation={[0.159, -0.15, 0.119]}
            />
            <mesh


                geometry={nodes.Object_244.geometry}
                material={materials["leaves.003"]}
                position={[2.848, 28.6, 49.581]}
                rotation={[-1.066, -0.957, -0.762]}
            />
            <mesh


                geometry={nodes.Object_246.geometry}
                material={materials["leaves.002"]}
                position={[4.118, 22.589, 50.387]}
                rotation={[1.621, 0.377, -1.148]}
            />
            <mesh


                geometry={nodes.Object_248.geometry}
                material={materials["leaves.002"]}
                position={[-11.692, 35.919, 50.993]}
                rotation={[-1, 0.573, 1.512]}
            />
            <mesh


                geometry={nodes.Object_250.geometry}
                material={materials["leaves.002"]}
                position={[5.287, 51.559, 23.934]}
                rotation={[-0.101, -1.084, 0.214]}
            />
            <mesh


                geometry={nodes.Object_252.geometry}
                material={materials["Material.007"]}
                position={[-11.518, 59.082, 15.713]}
                rotation={[2.717, -1.459, 1.823]}
            />
            <mesh


                geometry={nodes.Object_254.geometry}
                material={materials["Material.007"]}
                position={[-8.444, 55.726, 14.385]}
                rotation={[-0.648, -0.495, -2.269]}
            />
            <mesh


                geometry={nodes.Object_256.geometry}
                material={materials["Material.007"]}
                position={[-17.583, 58.315, 14.219]}
                rotation={[-3.081, -0.788, 1.488]}
            />
            <mesh


                geometry={nodes.Object_258.geometry}
                material={materials["Material.007"]}
                position={[-16.128, 56.62, 13.599]}
                rotation={[3.112, -0.776, 2.197]}
            />
            <mesh


                geometry={nodes.Object_260.geometry}
                material={materials.leaves}
                position={[-6.019, 67.897, 7.093]}
            />
            <mesh


                geometry={nodes.Object_262.geometry}
                material={materials.bones}
                position={[-31.841, 4.108, -53.714]}
                rotation={[2.509, -1.458, 2.545]}
            />
            <mesh


                geometry={nodes.Object_264.geometry}
                material={materials.leaves}
                position={[19.069, 68.409, -9.042]}
            />
            <mesh


                geometry={nodes.Object_266.geometry}
                material={materials.leaves}
                position={[-0.816, 79.72, -9.864]}
                rotation={[-0.577, -0.722, 0.778]}
            />
            <mesh


                geometry={nodes.Object_268.geometry}
                material={materials["leaves.002"]}
                position={[57.289, 33.751, -24.118]}
                rotation={[-1.394, -0.76, -1.294]}
            />
            <mesh


                geometry={nodes.Object_270.geometry}
                material={materials["leaves.002"]}
                position={[51.471, 22.021, -35.509]}
                rotation={[-0.491, 0.072, 0.01]}
            />
            <mesh


                geometry={nodes.Object_272.geometry}
                material={materials["leaves.002"]}
                position={[50.744, 22.438, -28.915]}
                rotation={[-1.18, -1.427, -1.57]}
            />
            <mesh


                geometry={nodes.Object_274.geometry}
                material={materials["leaves.003"]}
                position={[-0.504, 59.354, -19.589]}
                rotation={[-2.421, 0.558, 2.546]}
            />
            <mesh


                geometry={nodes.Object_276.geometry}
                material={materials["leaves.003"]}
                position={[-0.485, 58.539, -22.533]}
                rotation={[2.847, 0.954, 3.095]}
            />
            <mesh


                geometry={nodes.Object_278.geometry}
                material={materials["leaves.003"]}
                position={[-0.485, 55.804, -19.765]}
                rotation={[-2.732, 0.517, 2.522]}
            />
            <mesh


                geometry={nodes.Object_280.geometry}
                material={materials["leaves.002"]}
                position={[-0.067, 53.016, -26.68]}
                rotation={[-1.978, -1.374, -1.621]}
            />
            <mesh


                geometry={nodes.Object_282.geometry}
                material={materials["leaves.002"]}
                position={[1.554, 51.519, -29.068]}
                rotation={[-0.655, -0.464, -0.103]}
            />
            <mesh


                geometry={nodes.Object_284.geometry}
                material={materials["leaves.002"]}
                position={[-0.936, 51.328, -30.736]}
                rotation={[-2.153, 1.373, 1.615]}
            />
            <mesh


                geometry={nodes.Object_286.geometry}
                material={materials["leaves.002"]}
                position={[5.22, 50.188, -26.288]}
                rotation={[2.044, 0.719, -2.087]}
            />
            <mesh


                geometry={nodes.Object_288.geometry}
                material={materials["leaves.003"]}
                position={[5.413, 48.525, -24.62]}
                rotation={[0.126, -0.155, -1.168]}
            />
            <mesh


                geometry={nodes.Object_290.geometry}
                material={materials["leaves.002"]}
                position={[-44.166, 23.613, -26.873]}
                rotation={[0.509, -0.275, 0.524]}
            />
            <mesh


                geometry={nodes.Object_292.geometry}
                material={materials["leaves.003"]}
                position={[-41.94, 23.127, -28.067]}
                rotation={[2.602, -0.817, -2.696]}
            />
            <mesh


                geometry={nodes.Object_294.geometry}
                material={materials["leaves.002"]}
                position={[-45.578, 19.915, -31.074]}
                rotation={[2.574, 0.521, 2.974]}
            />
            <mesh


                geometry={nodes.Object_296.geometry}
                material={materials["leaves.003"]}
                position={[-37.652, 22.544, -23.922]}
                rotation={[-2.907, -0.512, -2.285]}
            />
            <mesh


                geometry={nodes.Object_298.geometry}
                material={materials["leaves.003"]}
                position={[-37.696, 21.757, -21.922]}
                rotation={[2.668, 1.189, -1.705]}
            />
            <mesh


                geometry={nodes.Object_300.geometry}
                material={materials.leaves}
                position={[-48.21, 34.645, -18.116]}
                rotation={[-2.813, -0.657, -2.765]}
            />
            <mesh


                geometry={nodes.Object_302.geometry}
                material={materials.leaves}
                position={[-48.182, 31.723, -21.881]}
                rotation={[2.766, 0.414, -3.089]}
            />
            <mesh


                geometry={nodes.Object_304.geometry}
                material={materials["leaves.003"]}
                position={[-48.569, 29.148, -16.588]}
                rotation={[2.766, 0.414, -3.089]}
            />
            <mesh


                geometry={nodes.Object_306.geometry}
                material={materials["leaves.002"]}
                position={[42.015, 27.132, -32.638]}
                rotation={[-0.448, -0.174, 0.647]}
            />
            <mesh


                geometry={nodes.Object_308.geometry}
                material={materials["leaves.002"]}
                position={[41.075, 22.284, -29.996]}
                rotation={[0.211, -0.786, 0.388]}
            />
            <mesh


                geometry={nodes.Object_310.geometry}
                material={materials["leaves.002"]}
                position={[38.939, 22.136, -25.474]}
                rotation={[-2.936, -0.905, 2.611]}
            />
            <mesh


                geometry={nodes.Object_312.geometry}
                material={materials["rocks.001"]}
                position={[37.741, 6.022, 27.39]}
                rotation={[-0.27, -0.961, -0.345]}
            />
            <mesh


                geometry={nodes.Object_314.geometry}
                material={materials.leaves}
                position={[-46.027, 27.345, 23.928]}
                rotation={[-2.574, 0.08, 3.039]}
            />
            <mesh


                geometry={nodes.Object_316.geometry}
                material={materials["leaves.001"]}
                position={[-43.365, 26.077, 24.485]}
                rotation={[2.998, 0.985, -2.322]}
            />
            <mesh


                geometry={nodes.Object_318.geometry}
                material={materials["leaves.003"]}
                position={[13.945, 22.866, 41.17]}
                rotation={[-0.216, 0.431, 0.043]}
            />
            <mesh


                geometry={nodes.Object_320.geometry}
                material={materials["leaves.002"]}
                position={[16.523, 21.241, 42.437]}
                rotation={[-1.436, 0.109, -0.726]}
            />
            <mesh


                geometry={nodes.Object_322.geometry}
                material={materials["leaves.002"]}
                position={[16.593, 24.556, 48.199]}
                rotation={[-0.562, -0.745, -0.14]}
            />
            <mesh


                geometry={nodes.Object_324.geometry}
                material={materials["leaves.002"]}
                position={[15.445, 16.195, 40.844]}
                rotation={[-0.112, 0.74, -1.163]}
            />
            <mesh


                geometry={nodes.Object_326.geometry}
                material={materials["leaves.002"]}
                position={[14.994, 15.24, 40.897]}
                rotation={[1.199, 0.303, -2.359]}
            />
            <mesh


                geometry={nodes.Object_328.geometry}
                material={materials["leaves.002"]}
                position={[23.048, 32.526, 45.315]}
                rotation={[-0.193, -0.929, 0.533]}
            />
            <mesh


                geometry={nodes.Object_330.geometry}
                material={materials["leaves.002"]}
                position={[30.226, 27.806, 46.92]}
                rotation={[-2.742, 0.01, -2.402]}
            />
            <mesh


                geometry={nodes.Object_332.geometry}
                material={materials["leaves.002"]}
                position={[34.743, 26.469, 48.565]}
                rotation={[-2.197, -0.927, -1.513]}
            />
            <mesh


                geometry={nodes.Object_334.geometry}
                material={materials["leaves.002"]}
                position={[32.116, 24.912, 51.326]}
                rotation={[0.421, -0.811, 1.16]}
            />
            <mesh


                geometry={nodes.Object_336.geometry}
                material={materials["leaves.003"]}
                position={[29.243, 21.646, 52.717]}
                rotation={[0.245, -0.686, 0.619]}
            />
            <mesh


                geometry={nodes.Object_338.geometry}
                material={materials["leaves.003"]}
                position={[25.583, 19.772, 52.906]}
                rotation={[1.834, -0.759, 1.592]}
            />
            <mesh


                geometry={nodes.Object_340.geometry}
                material={materials["leaves.002"]}
                position={[17.946, 24.091, -47.066]}
                rotation={[-0.448, -0.174, 0.647]}
            />
            <mesh


                geometry={nodes.Object_342.geometry}
                material={materials["leaves.002"]}
                position={[18.741, 21.744, -48.461]}
                rotation={[2.425, -1.269, -2.633]}
            />
            <mesh


                geometry={nodes.Object_344.geometry}
                material={materials["leaves.002"]}
                position={[15.01, 20.511, -49.615]}
                rotation={[-1.473, 0.958, 1.164]}
            />
            <mesh


                geometry={nodes.Object_346.geometry}
                material={materials["leaves.004"]}
                position={[25.706, 21.272, -46.526]}
                rotation={[-1.81, -0.349, -0.802]}
            />
            <mesh


                geometry={nodes.Object_348.geometry}
                material={materials["leaves.002"]}
                position={[21.935, 34.64, -39.17]}
                rotation={[-0.1, -0.247, 0.793]}
            />
            <mesh


                geometry={nodes.Object_350.geometry}
                material={materials.leaves}
                position={[-36.562, 45.408, 0.808]}
                rotation={[-2.477, 0.767, 2.214]}
            />
            <mesh


                geometry={nodes.Object_352.geometry}
                material={materials.leaves}
                position={[-40.591, 38.662, 2.951]}
                rotation={[-0.891, 0.336, 1.541]}
            />
            <mesh


                geometry={nodes.Object_354.geometry}
                material={materials["leaves.003"]}
                position={[-36.767, 35.315, -1.307]}
                rotation={[-1.69, -0.507, 0.028]}
            />
            <mesh


                geometry={nodes.Object_356.geometry}
                material={materials["Material.007"]}
                position={[-16.808, 58.693, 11.968]}
                rotation={[2.636, -0.084, 2.244]}
            />
            <mesh


                geometry={nodes.Object_358.geometry}
                material={materials["leaves.002"]}
                position={[-59.556, 4.693, -17.777]}
                rotation={[-1.661, -0.873, -1.907]}
            />
            <mesh


                geometry={nodes.Object_360.geometry}
                material={materials["leaves.002"]}
                position={[-36.792, 4.023, -47.22]}
                rotation={[-1.205, -0.237, -0.644]}
            />
            <mesh


                geometry={nodes.Object_362.geometry}
                material={materials["leaves.002"]}
                position={[-57.398, 4.874, -17.055]}
                rotation={[-1.185, 0.51, -0.346]}
            />
            <mesh


                geometry={nodes.Object_364.geometry}
                material={materials.leaves}
                position={[-49.084, 6.079, -0.629]}
                rotation={[-1.3, 0.186, -0.188]}
            />
            <mesh


                geometry={nodes.Object_366.geometry}
                material={materials["leaves.002"]}
                position={[-49.652, 5.187, 11.04]}
                rotation={[-2.172, 0.055, 1.966]}
            />
            <mesh


                geometry={nodes.Object_368.geometry}
                material={materials.leaves}
                position={[-0.711, 38.829, -18.658]}
                rotation={[-1.262, -0.402, -0.791]}
            />
            <mesh


                geometry={nodes.Object_370.geometry}
                material={materials.leaves}
                position={[0.854, 19.845, -30.711]}
                rotation={[-1.8, -0.439, -0.957]}
            />
            <mesh


                geometry={nodes.Object_372.geometry}
                material={materials["leaves.003"]}
                position={[-21.012, 6.564, -45.429]}
                rotation={[-1.073, -0.447, -1.041]}
            />
            <mesh


                geometry={nodes.Object_374.geometry}
                material={materials.leaves}
                position={[-30.733, 4.785, -48.868]}
                rotation={[-1.781, -0.763, -1.993]}
            />
            <mesh


                geometry={nodes.Object_376.geometry}
                material={materials["leaves.002"]}
                position={[-15.582, 5.201, -57.266]}
                rotation={[-1.702, -0.399, -1.885]}
            />
            <mesh


                geometry={nodes.Object_378.geometry}
                material={materials["leaves.002"]}
                position={[-19.759, 3.913, -63.351]}
                rotation={[-1.803, -0.384, -1.716]}
            />
            <mesh


                geometry={nodes.Object_380.geometry}
                material={materials.leaves}
                position={[42.407, 7.061, -31.44]}
                rotation={[-1.645, -0.171, -1.951]}
            />
            <mesh


                geometry={nodes.Object_382.geometry}
                material={materials["leaves.002"]}
                position={[58.761, 3.089, 2.051]}
                rotation={[-0.889, 0.341, -1.446]}
            />
            <mesh


                geometry={nodes.Object_384.geometry}
                material={materials["leaves.002"]}
                position={[54.077, 8.759, 2.932]}
                rotation={[-0.526, 0.012, -1.172]}
            />
            <mesh


                geometry={nodes.Object_386.geometry}
                material={materials["rocks.001"]}
                position={[19.875, 6.246, 48.287]}
                rotation={[0.217, 0.17, -3.111]}
            />
            <mesh


                geometry={nodes.Object_388.geometry}
                material={materials["leaves.003"]}
                position={[17.677, 6.267, 48.927]}
                rotation={[-0.689, -0.477, -1.162]}
            />
            <mesh


                geometry={nodes.Object_390.geometry}
                material={materials.leaves}
                position={[38.769, 4.892, 33.7]}
                rotation={[-0.98, 0.185, -1.078]}
            />
            <mesh


                geometry={nodes.Object_392.geometry}
                material={materials["leaves.003"]}
                position={[35.729, 5.275, 36.784]}
                rotation={[-0.877, 0.304, -1.279]}
            />
            <mesh


                geometry={nodes.Object_394.geometry}
                material={materials["leaves.002"]}
                position={[45.259, 6.992, -20.164]}
                rotation={[-1.983, 0.09, -2.79]}
            />
            <mesh


                geometry={nodes.Object_396.geometry}
                material={materials["leaves.003"]}
                position={[3.808, 15.185, -37.128]}
                rotation={[-2.299, -0.542, -2.837]}
            />
            <mesh


                geometry={nodes.Object_398.geometry}
                material={materials.leaves}
                position={[-21.587, 26.305, -3.458]}
                rotation={[-2.418, -0.783, 3.024]}
            />
            <mesh


                geometry={nodes.Object_400.geometry}
                material={materials["leaves.002"]}
                position={[-10.739, 7.506, 40.066]}
                rotation={[-1.738, -0.604, -3.084]}
            />
            <mesh


                geometry={nodes.Object_402.geometry}
                material={materials.leaves}
                position={[-30.061, 6.426, 38.854]}
                rotation={[-1.738, -0.604, -3.084]}
            />
            <mesh


                geometry={nodes.Object_404.geometry}
                material={materials.leaves}
                position={[0.303, 6.64, 48.007]}
                rotation={[-1.876, -0.243, -3.11]}
            />
            <mesh


                geometry={nodes.Object_406.geometry}
                material={materials.leaves}
                position={[-36.593, 7.299, 21.684]}
                rotation={[-1.703, -0.708, -2.807]}
            />
            <mesh


                geometry={nodes.Object_408.geometry}
                material={materials["leaves.002"]}
                position={[15.898, 30.14, 21.216]}
                rotation={[-1.132, 0.181, -1.133]}
            />
            <mesh


                geometry={nodes.Object_410.geometry}
                material={materials["leaves.003"]}
                position={[14.791, 56.284, -2.548]}
                rotation={[-1.513, 0.628, -0.23]}
            />
            <mesh


                geometry={nodes.Object_412.geometry}
                material={materials.leaves}
                position={[6.489, 57.214, -5.198]}
                rotation={[-1.516, 0.618, -0.334]}
            />
            <mesh


                geometry={nodes.Object_414.geometry}
                material={materials["leaves.003"]}
                position={[1.06, 53.106, 12.243]}
                rotation={[-1.009, -0.04, -0.099]}
            />
            <mesh


                geometry={nodes.Object_416.geometry}
                material={materials["leaves.002"]}
                position={[23.816, 7.523, -43.555]}
                rotation={[-1.434, -0.115, -0.849]}
            />
            <mesh


                geometry={nodes.Object_418.geometry}
                material={materials["leaves.002"]}
                position={[41.158, 4.259, -47.027]}
                rotation={[-1.434, -0.115, -0.849]}
            />
            <mesh


                geometry={nodes.Object_420.geometry}
                material={materials.leaves}
                position={[24.246, 5.325, 47.331]}
                rotation={[-1.122, 0.046, -0.979]}
            />
            <mesh


                geometry={nodes.Object_422.geometry}
                material={materials["leaves.001"]}
                position={[-36.513, 3.873, -48.694]}
                rotation={[-2.168, 0.011, 2.874]}
            />
            <mesh


                geometry={nodes.Object_424.geometry}
                material={materials["leaves.002"]}
                position={[-58.574, 4.84, -14.182]}
                rotation={[-2.168, 0.011, 2.874]}
            />
            <mesh


                geometry={nodes.Object_426.geometry}
                material={materials["leaves.002"]}
                position={[-58.4, 4.889, -14.386]}
                rotation={[-1.034, 0.233, 0.35]}
            />
            <mesh


                geometry={nodes.Object_428.geometry}
                material={materials["leaves.002"]}
                position={[52.579, 5.74, -24.321]}
                rotation={[-1.305, 0.662, 0.083]}
            />
            <mesh


                geometry={nodes.Object_430.geometry}
                material={materials.leaves}
                position={[52.261, 5.967, -24.149]}
                rotation={[-2.081, 0.317, 3.003]}
            />
            <mesh


                geometry={nodes.Object_432.geometry}
                material={materials["leaves.001"]}
                position={[59.041, 3.957, -4.829]}
                rotation={[-1.398, 0.59, 0.044]}
            />
            <mesh


                geometry={nodes.Object_434.geometry}
                material={materials["leaves.002"]}
                position={[59.059, 3.715, -6.466]}
                rotation={[-2.259, -0.44, 2.857]}
            />
            <mesh


                geometry={nodes.Object_436.geometry}
                material={materials.leaves}
                position={[32.543, 4.969, -48.31]}
                rotation={[-2.016, 0.668, 1.46]}
            />
            <mesh


                geometry={nodes.Object_438.geometry}
                material={materials["leaves.001"]}
                position={[30.468, 4.581, -47.728]}
                rotation={[-1.773, -0.994, -1.748]}
            />
            <mesh


                geometry={nodes.Object_440.geometry}
                material={materials["leaves.003"]}
                position={[-13.764, 5.772, -54.865]}
                rotation={[-1.402, -0.343, -1.173]}
            />
            <mesh


                geometry={nodes.Object_442.geometry}
                material={materials["leaves.001"]}
                position={[8.805, 56.891, -5.171]}
                rotation={[-2.168, 0.011, 2.874]}
            />
            <mesh


                geometry={nodes.Object_444.geometry}
                material={materials["leaves.001"]}
                position={[13.105, 56.324, -3.126]}
                rotation={[-2.189, -0.169, 1.99]}
            />
            <mesh


                geometry={nodes.Object_446.geometry}
                material={materials["leaves.003"]}
                position={[20.643, 5.802, -47.337]}
                rotation={[-2.139, -0.268, -1.997]}
            />
            <mesh


                geometry={nodes.Object_448.geometry}
                material={materials["leaves.001"]}
                position={[23.623, 7.113, -47.044]}
                rotation={[-1.834, -0.457, -1.625]}
            />
            <mesh


                geometry={nodes.Object_450.geometry}
                material={materials["leaves.003"]}
                position={[-33.888, 7.114, 28.823]}
                rotation={[-1.522, -0.654, -1.86]}
            />
            <mesh


                geometry={nodes.Object_452.geometry}
                material={materials["leaves.003"]}
                position={[-22.955, 5.184, 48.424]}
                rotation={[-1.926, -0.336, -3.08]}
            />
            <mesh


                geometry={nodes.Object_454.geometry}
                material={materials["leaves.001"]}
                position={[-2.15, 5.398, 53.314]}
                rotation={[-1.836, 0.542, 1.579]}
            />
            <mesh


                geometry={nodes.Object_456.geometry}
                material={materials["leaves.002"]}
                position={[18.965, 13.407, -31.976]}
                rotation={[-1.899, -0.478, -2.392]}
            />
            <mesh


                geometry={nodes.Object_458.geometry}
                material={materials["leaves.002"]}
                position={[12.389, 6.316, -48.856]}
                rotation={[-1.742, -0.399, -2.082]}
            />
            <mesh


                geometry={nodes.Object_460.geometry}
                material={materials["leaves.002"]}
                position={[26.469, 4.413, -48.073]}
                rotation={[-1.925, -0.589, -2.247]}
            />
            <mesh


                geometry={nodes.Object_462.geometry}
                material={materials["leaves.001"]}
                position={[-10.814, 5.394, -61.04]}
                rotation={[-1.886, 0.21, 1.847]}
            />
            <mesh


                geometry={nodes.Object_464.geometry}
                material={materials["leaves.002"]}
                position={[-45.324, 5.215, -36.725]}
                rotation={[-1.661, -0.873, -1.907]}
            />
            <mesh


                geometry={nodes.Object_466.geometry}
                material={materials["leaves.001"]}
                position={[-48.484, 5.239, -35.095]}
                rotation={[-1.084, -0.362, -0.841]}
            />
            <mesh


                geometry={nodes.Object_468.geometry}
                material={materials.leaves}
                position={[-51.006, 5.333, -30.611]}
                rotation={[-1.286, -0.322, -1.147]}
            />
            <mesh


                geometry={nodes.Object_470.geometry}
                material={materials["leaves.001"]}
                position={[0.538, 16.216, -36.681]}
                rotation={[-1.886, 0.21, 1.847]}
            />
            <mesh


                geometry={nodes.Object_472.geometry}
                material={materials["leaves.001"]}
                position={[0.748, 16.085, -36.309]}
                rotation={[-1.243, -0.19, -1.233]}
            />
            <mesh


                geometry={nodes.Object_474.geometry}
                material={materials["leaves.001"]}
                position={[4.544, 18.227, -34.824]}
                rotation={[-1.457, 0.102, -1.097]}
            />
            <mesh


                geometry={nodes.Object_476.geometry}
                material={materials.leaves}
                position={[9.734, 11.059, -42.154]}
                rotation={[-2.056, -0.085, -1.866]}
            />
            <mesh


                geometry={nodes.Object_478.geometry}
                material={materials["leaves.002"]}
                position={[29.273, 4.271, -48.337]}
                rotation={[-2.016, 0.693, 1.343]}
            />
            <mesh


                geometry={nodes.Object_480.geometry}
                material={materials["rocks.001"]}
                position={[-7.92, 42.512, -14.247]}
                rotation={[-0.344, -0.726, -0.059]}
            />
            <mesh


                geometry={nodes.Object_482.geometry}
                material={materials.leaves}
                position={[-11.218, 41.798, -9.622]}
                rotation={[-2.217, -0.744, 3.05]}
            />
            <mesh


                geometry={nodes.Object_484.geometry}
                material={materials.leaves}
                position={[-7.377, 40.132, -16.648]}
                rotation={[-2.651, -0.1, 2.52]}
            />
            <mesh


                geometry={nodes.Object_486.geometry}
                material={materials["leaves.001"]}
                position={[20.798, 8.736, -42.659]}
                rotation={[-1.834, -0.457, -1.625]}
            />
            <mesh


                geometry={nodes.Object_488.geometry}
                material={materials["leaves.001"]}
                position={[-5.961, 39.822, -17.901]}
                rotation={[-1.462, -0.184, -1.79]}
            />
            <mesh


                geometry={nodes.Object_490.geometry}
                material={materials["leaves.001"]}
                position={[-5.971, 39.752, -17.655]}
                rotation={[-2.061, -0.4, 3.14]}
            />
            <mesh


                geometry={nodes.Object_492.geometry}
                material={materials["leaves.003"]}
                position={[9.62, 56.722, -3.969]}
                rotation={[-1.513, 0.628, -0.23]}
            />
            <mesh


                geometry={nodes.Object_494.geometry}
                material={materials["leaves.002"]}
                position={[-10.921, 21.643, -25.411]}
                rotation={[-1.205, -0.237, -0.644]}
            />
            <mesh


                geometry={nodes.Object_496.geometry}
                material={materials["leaves.001"]}
                position={[-10.642, 21.493, -26.884]}
                rotation={[-2.168, 0.011, 2.874]}
            />
            <mesh


                geometry={nodes.Object_498.geometry}
                material={materials["leaves.002"]}
                position={[-10.873, 20.337, -28.214]}
                rotation={[-2.79, 0.055, 2.912]}
            />
            <mesh


                geometry={nodes.Object_500.geometry}
                material={materials["leaves.001"]}
                position={[-10.593, 21.007, -27.401]}
                rotation={[-1.808, 0.23, 0.112]}
            />
            <mesh


                geometry={nodes.Object_502.geometry}
                material={materials["leaves.003"]}
                position={[-8.185, 21.247, -26.98]}
                rotation={[-2.489, -0.345, -2.571]}
            />
            <mesh


                geometry={nodes.Object_504.geometry}
                material={materials["leaves.003"]}
                position={[-24.578, 25.59, -2.266]}
                rotation={[-2.343, -0.713, -2.832]}
            />
            <mesh


                geometry={nodes.Object_506.geometry}
                material={materials["leaves.003"]}
                position={[12.582, 7.11, 46.061]}
                rotation={[-1.445, -0.26, -2.675]}
            />
            <mesh


                geometry={nodes.Object_508.geometry}
                material={materials["leaves.003"]}
                position={[60.024, 3.499, -4.444]}
                rotation={[-1.445, -0.26, -2.675]}
            />
            <mesh


                geometry={nodes.Object_510.geometry}
                material={materials["leaves.002"]}
                position={[-15.166, 4.273, -63.23]}
                rotation={[-1.642, -0.598, -2.214]}
            />
            <mesh


                geometry={nodes.Object_512.geometry}
                material={materials["leaves.002"]}
                position={[-16.151, 4.328, -62.761]}
                rotation={[-1.642, -0.598, -2.214]}
            />
            <mesh


                geometry={nodes.Object_514.geometry}
                material={materials["rocks.001"]}
                position={[-16.976, 4.695, -60.977]}
                rotation={[-0.493, -1.084, -0.221]}
            />
            <mesh


                geometry={nodes.Object_516.geometry}
                material={materials["leaves.001"]}
                position={[-24.428, 4.471, -58.969]}
                rotation={[-1.974, 0.454, 2.091]}
            />
            <mesh


                geometry={nodes.Object_518.geometry}
                material={materials["leaves.002"]}
                position={[-25.194, 5.05, -52.855]}
                rotation={[-1.661, -0.873, -1.907]}
            />
            <mesh


                geometry={nodes.Object_520.geometry}
                material={materials["leaves.001"]}
                position={[-6.714, 49.423, -10.06]}
                rotation={[-1.568, -0.533, -1.719]}
            />
            <mesh


                geometry={nodes.Object_522.geometry}
                material={materials.leaves}
                position={[-7.595, 49.345, -8.653]}
                rotation={[-2.145, -0.62, -3.089]}
            />
            <mesh


                geometry={nodes.Object_524.geometry}
                material={materials.leaves}
                position={[-2.951, 56.141, -8.219]}
                rotation={[-1.523, -0.406, -0.993]}
            />
            <mesh


                geometry={nodes.Object_526.geometry}
                material={materials["leaves.003"]}
                position={[-4.485, 56.352, -6.66]}
                rotation={[-2.343, -0.713, -2.832]}
            />
            <mesh


                geometry={nodes.Object_528.geometry}
                material={materials.leaves}
                position={[-11.652, 41.334, -12.055]}
                rotation={[-1.372, -0.173, -1.041]}
            />
            <mesh


                geometry={nodes.Object_530.geometry}
                material={materials.leaves}
                position={[-12.436, 41.462, -12.38]}
                rotation={[-2.12, -0.08, 2.27]}
            />
            <mesh


                geometry={nodes.Object_532.geometry}
                material={materials["Material.005"]}
                position={[25.329, 35.504, 0.393]}
                rotation={[-2.9, -1.301, -2.974]}
            />
            <mesh


                geometry={nodes.Object_534.geometry}
                material={materials["Material.005"]}
                position={[-17.075, 28.071, -11.007]}
                rotation={[-0.064, 0.098, -0.059]}
            />
            <mesh


                geometry={nodes.Object_536.geometry}
                material={materials["Material.005"]}
                position={[-20.796, 11.205, -33.533]}
                rotation={[0.055, 0.194, -0.386]}
            />
            <mesh


                geometry={nodes.Object_538.geometry}
                material={materials["Material.005"]}
                position={[-23.165, 10.91, -31.154]}
                rotation={[-1.93, -1.299, 1.32]}
            />
            <mesh


                geometry={nodes.Object_540.geometry}
                material={materials["rocks.001"]}
                position={[-29.58, 6.515, -36.673]}
                rotation={[-2.855, 0.671, -3.101]}
            />
            <mesh


                geometry={nodes.Object_542.geometry}
                material={materials["leaves.003"]}
                position={[-28.396, 7.683, -31.766]}
                rotation={[-1.073, -0.447, -1.041]}
            />
            <mesh


                geometry={nodes.Object_544.geometry}
                material={materials["leaves.002"]}
                position={[-32.817, 5.021, -38.095]}
                rotation={[-1.661, -0.873, -1.907]}
            />
            <mesh


                geometry={nodes.Object_546.geometry}
                material={materials["Material.005"]}
                position={[-10.249, 29.189, 18.484]}
                rotation={[-3.077, 0.119, 3.069]}
            />
            <mesh


                geometry={nodes.Object_548.geometry}
                material={materials["Material.005"]}
                position={[43.473, 7.897, 4.602]}
                rotation={[-2.849, -1.243, -3.065]}
            />
            <mesh


                geometry={nodes.Object_550.geometry}
                material={materials["Material.005"]}
                position={[-37.185, 11.093, -10.091]}
                rotation={[-0.116, 0.637, -0.132]}
            />
            <mesh


                geometry={nodes.Object_552.geometry}
                material={materials["Material.005"]}
                position={[14.486, 52.469, -7.003]}
                rotation={[2.93, -1.127, 2.734]}
            />
            <mesh


                geometry={nodes.Object_554.geometry}
                material={materials["leaves.003"]}
                position={[-15.447, 32.914, -12.668]}
                rotation={[-2.418, -0.696, -2.912]}
            />
            <mesh


                geometry={nodes.Object_556.geometry}
                material={materials["Material.005"]}
                position={[-11.442, -1.91, -80.67]}
                rotation={[-0.206, 0.344, -0.052]}
            />
            <mesh


                geometry={nodes.Object_558.geometry}
                material={materials["leaves.001"]}
                position={[-0.81, 7.07, -54.163]}
                rotation={[-2.057, -0.339, 3.058]}
            />
            <mesh


                geometry={nodes.Object_560.geometry}
                material={materials["leaves.002"]}
                position={[-2.282, 6.378, -55.41]}
                rotation={[-1.85, -0.402, -2.235]}
            />
            <mesh


                geometry={nodes.Object_562.geometry}
                material={materials["leaves.001"]}
                position={[-4.255, 6.391, -56.83]}
                rotation={[-2.057, -0.339, 3.058]}
            />
            <mesh


                geometry={nodes.Object_564.geometry}
                material={materials["leaves.002"]}
                position={[4.594, 5.013, -53.781]}
                rotation={[-1.937, -0.262, -2.313]}
            />
            <mesh


                geometry={nodes.Object_566.geometry}
                material={materials["rocks.001"]}
                position={[-46.568, 5.436, -31.592]}
                rotation={[-2.855, 0.671, -3.101]}
            />
            <mesh


                geometry={nodes.Object_568.geometry}
                material={materials.leaves}
                position={[-47.259, 6.681, -31.966]}
                rotation={[-1.286, -0.322, -1.147]}
            />
            <mesh


                geometry={nodes.Object_570.geometry}
                material={materials["Material.005"]}
                position={[15.132, 39.186, -14.855]}
                rotation={[0.313, -1.274, 0.085]}
            />
            <mesh


                geometry={nodes.Object_572.geometry}
                material={materials.leaves}
                position={[-59.394, 5.428, 15.221]}
                rotation={[-2.135, -0.309, 2.527]}
            />
            <mesh


                geometry={nodes.Object_574.geometry}
                material={materials.leaves}
                position={[-49.015, 6.153, 18.792]}
                rotation={[-1.324, -0.359, -1.111]}
            />
            <mesh


                geometry={nodes.Object_576.geometry}
                material={materials["leaves.002"]}
                position={[-54.79, 5, 4.829]}
                rotation={[-0.996, 0.324, -0.279]}
            />
            <mesh


                geometry={nodes.Object_613.geometry}
                material={materials["leaves.001"]}
                position={[62.544, -0.2, 4.47]}
                rotation={[-0.761, 0.476, -0.07]}
            />
            <mesh


                geometry={nodes.Object_615.geometry}
                material={materials.butter}
                position={[1.61, 7.889, -58.279]}
                rotation={[-0.835, -0.503, 0.149]}
            />
            <mesh


                geometry={nodes.Object_617.geometry}
                material={materials.flower}
                position={[6.317, 10.578, -58.455]}
                rotation={[-1.215, -0.525, 0.164]}
            />
            <mesh


                geometry={nodes.Object_619.geometry}
                material={materials["flower.001"]}
                position={[-14.584, 10.247, -58.696]}
                rotation={[-1.215, -0.525, 0.164]}
            />
        </a.group>
    );
}