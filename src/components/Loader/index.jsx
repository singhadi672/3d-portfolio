import { Html } from "@react-three/drei";

export default function Loader() {
    return (
        <Html>
            <div className="flex justify-center items-center w-full h-full">
                <div className="absolute top-0 -left-40 w-[20rem] h-[2rem] bg-hero_highlight-dark rounded-2xl text-w text-center border-4 border-hero_dark-100">
                    loading...
                </div>
            </div>
        </Html>
    )
}