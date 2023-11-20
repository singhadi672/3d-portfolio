import { IKContext, IKImage } from "imagekitio-react";
import { ImagekitLink } from "../../../constants";

export default function ImageKitWrapper({ path, width = 200, height = 200, className = "" }) {

    return (
        <IKContext urlEndpoint={ImagekitLink}>
            <IKImage
                path={path}
                loading="lazy"
                width={width}
                height={height}
                className={className}
            />
        </IKContext>
    )
}