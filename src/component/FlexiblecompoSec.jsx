import Image from "next/image"
import Link from 'next/link';
import bluebtn from "@/asset/images/bluebtn.svg";
import { useState } from "react";
import { processVideoURL } from "@/utils/utils";

const FlexiblecompoSec = ({ imageURL, videoUrl }) => {

    const [videoshow, setVideoshow] = useState('');
    const [video, setVideo] = useState('');
    const videoshowHandler = () => {
        setVideoshow(true);
        setVideo(processVideoURL(videoUrl))
    }
    return (
        <>
            <div className="flexiblewrap">
                <div className="videoWrap">
                    <div className="container">
                        <div className={`videoWrapper ${videoshow && 'active'}`}>
                            {imageURL &&
                                <div className="videoFrame">
                                    <Image src={imageURL} width={1312} height={600} alt="ivideoimg" />
                                </div>
                            }
                            {videoUrl &&
                                <>
                                    (videoUrl.trim() &&
                                    <div className="video-blk">
                                        <iframe height="500px" width="1000px" src={video} />
                                    </div>
                                    )

                                    (videoUrl.trim() &&
                                    <div className="blueBtn">
                                        <Link href="javascript:void(0)" onClick={videoshowHandler} ><Image src={bluebtn} alt="bluebtn" /></Link>
                                    </div>
                                    )
                                </>
                            }
                        </div>
                        <div className="commontag">
                            <div className=""></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FlexiblecompoSec;