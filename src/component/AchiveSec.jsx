import Image from 'next/image';
import SectionTitle from "./layouts/SectionTitle";
import { useState , useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const AchiveSec = ({ sectionHeading, heading, description, imageInfo }) => {

    const [addClass, setAddClass] = useState(false);
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


    return (
        <>
            <div className='achivewrap'>
                <SectionTitle sectionHeading={sectionHeading} heading={heading} description={description} buttonInfo='' />
                {imageInfo &&
                    <div className="achivewrapper">
                        <div className='container'>
                            <div className='achivebox'>
                                <div className='row'>
                                    {imageInfo.map((info,index) => {
                                        const { image } = info;
                                        if (image) {
                                            return (
                                                <div className='col-lg-4 col-md-6' key={index}>
                                                    <div className={`achiveimg ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                                                        <Image src={image.sourceUrl} width={602} height={398} alt='introImg' />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default AchiveSec;