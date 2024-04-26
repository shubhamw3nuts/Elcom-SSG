import Image from "next/image"
import Link from 'next/link';
import bluebtn from "@/asset/images/bluebtn.svg";
import { useState } from "react";
import { processVideoURL } from "@/utils/utils";

const VideoSec = ({ videoImage, videoURL }) => {

    const [videoshow, setVideoshow] = useState('');
    const [video, setVideo] = useState('');

    const videoshowHandler = (e) => {
        e.preventDefault();
        setVideoshow(true);
        setVideo(processVideoURL(videoURL))
    }

    if (videoImage || videoURL) {
        return (
            <>
                <div className="videoWrap">
                    <div className="container">
                        <div className={`videoWrapper ${videoshow && 'active'}`}>
                            {videoImage &&
                                <div className="videoFrame">
                                    <Image src={videoImage.sourceUrl} width={1312} height={600} alt="ivideoimg" />
                                </div>
                            }
                            {videoURL &&
                                <>
                                    {(videoURL.trim() != '') &&
                                        <div className="video-blk">
                                            <iframe height="500px" width="1000px" src={video} />
                                        </div>
                                    }
                                    {(videoURL.trim() != '') &&
                                        <div className="blueBtn">
                                            <Link href="#" onClick={videoshowHandler} ><Image src={bluebtn} alt="bluebtn" /></Link>
                                        </div>
                                    }
                                </>
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return ''
}

export default VideoSec;