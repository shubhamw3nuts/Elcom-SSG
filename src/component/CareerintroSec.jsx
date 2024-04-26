import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import SplitText from '@/component/layouts/SplitText';
import bluebtn from "@/asset/images/bluebtn.svg";
import Link from 'next/link';

const CareerintroSec = ({ sectionHeading, heading, description, image, vidoeUrl,scrollToPositions,introButtonText }) => {
    const [videoshow, setVideoshow] = useState('');
    const [addClass, setAddClass] = useState(false);
    const [video, setVideo] = useState("");

    const videoshowHandler = (e) => {
        e.preventDefault();
        setVideoshow(true);
        setVideo(vidoeUrl);
    }

    const [inViewRef, inView] = useInView({
        triggerOnce: true,
    });

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

    if (sectionHeading || heading || description || image || vidoeUrl) {
        // vidoeUrl="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"
        return (
            <>
                <div className={`careerSec ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                    <div className="introWrap">
                        <div className="container">
                            <div className="lineEl"></div>
                            <div className="introWapper">
                                {sectionHeading && <div className="introTtl">
                                    <h6 className="label-text">{sectionHeading}</h6>
                                </div>}
                                <div className='row'>
                                    {image && <div className="col-lg-6">
                                        <div className={`introVideo ${videoshow && 'active'}`}>
                                            <div className="videoFram flex-shrink: 0;">
                                                <Image src={image.sourceUrl} width={602} height={398} alt="videoImg" />
                                            </div>
                                            {vidoeUrl &&
                                                <div className="video-blk">
                                                    <iframe src={video} height="602px" width="398px" />
                                                </div>
                                            }
                                            {vidoeUrl &&
                                                <div className="blueBtn">
                                                    <Link href="#" onClick={videoshowHandler} ><Image src={bluebtn} alt="bluebtn" /></Link>
                                                </div>
                                            }
                                        </div>
                                    </div>}
                                    {(heading || description) && <div className={`col-lg-${image ? '6' : '12'}`}>
                                        <div className="introText">
                                            <div className="textFram">
                                                {heading && <h3><SplitText copy={heading} role="test" /></h3>}
                                                {description && <p className='fadeInUp'>{description}</p>}
                                                {introButtonText && 
                                                <div className="btnbox fadeInUp-btn ">
                                                    <button className="elcom-btn primary-black-btn" onClick={() => scrollToPositions()} >{introButtonText}</button>
                                                </div>}
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return ''
}

export default CareerintroSec;