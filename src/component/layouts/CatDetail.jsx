import Link from 'next/link';
import Image from "next/image"
import React, { useState, useEffect, Fragment } from 'react';
import { useInView } from 'react-intersection-observer';
import SplitText from '@/component/layouts/SplitText';
import bluebtn from "@/asset/images/bluebtn.svg";
import { decodeHTMLString, processVideoURL } from '@/utils/utils';

const CatDetail = ({ name, description, image, buttonOne, ancestors, videoUrl }) => {
    // let videoUrl = "https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"
    const [video, setVideo] = useState("");
    const [videoshow, setVideoshow] = useState('');
    const videoshowHandler = (e) => {
        e.preventDefault();
        setVideoshow(true);
        setVideo(processVideoURL(videoUrl));
    }

    const [inViewRef, inView] = useInView({
        triggerOnce: true,
    });
    const [addClass, setAddClass] = useState(false);
    useEffect(() => {
        if (inView && !addClass) {
            // Add a delay of 1000 milliseconds (1 second) before adding the class
            const delayTimeout = setTimeout(() => {
                setAddClass(true);
            }, 500);

            // Clear the timeout if the component goes out of view before the delay
            return () => clearTimeout(delayTimeout);
        }
    }, [inView, addClass]);

    let ancestorsHtml = '';
    if (ancestors) {
        let reversedArray = ancestors.nodes.slice().reverse();
        ancestorsHtml = reversedArray.map((ancestor, index) => {
            return (<React.Fragment key={index}><Link href={ancestor.uri}>{ancestor.name}</Link>{">"}</React.Fragment>)
        })
    }

    return (
        <>
            <div className={`categoryWrap ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                <div className="container">
                    <div className="catedaryWrapper">
                        <div className="catdetWrap">
                            <span>{"products>"}{ancestorsHtml}<Link href="#" onClick={(e) => e.preventDefault()}>{name}</Link></span>
                        </div>
                    </div>
                    <div className='categorySec'>
                        <div className='row'>
                            {image && <div className='col-lg-6'>
                                <div className={`introVideo ${videoshow && 'active'}`}>
                                    <div className='catimage flex-shrink-0'>
                                        <Image src={image.sourceUrl} width={596} height={357} alt="catImg" />
                                    </div>
                                    {videoUrl &&
                                        <div className="video-blk">
                                            <iframe src={video} height="382px" width="599px" allow="autoplay; fullscreen" allowFullScreen />
                                        </div>
                                    }
                                    {videoUrl &&
                                        <div className="blueBtn">
                                            <Link href="#" onClick={(e) => videoshowHandler(e)} ><Image src={bluebtn} alt="bluebtn" /></Link>
                                        </div>
                                    }
                                </div>
                            </div>}
                            <div className={`col-lg-${image ? 5 : 12}`}>
                                {name &&
                                    <div className='catDtl'>
                                        <h3><SplitText copy={name} role="test" /></h3>
                                        {description && <p className='fadeInUp'>{decodeHTMLString(description)}</p>}
                                    </div>
                                }
                                {buttonOne &&
                                    <div className='btnbox fadeInUp-btn'>
                                        <Link href={buttonOne.url} target={buttonOne.target} className='elcom-btn primary-black-btn'>{buttonOne.title}</Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CatDetail;