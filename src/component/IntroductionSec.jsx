import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import introImg from '@/asset/images/introImg.webp';
import { useInView } from 'react-intersection-observer';
import { useState , useEffect } from 'react';
import SplitText from '@/component/layouts/SplitText';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const IntroductionSec = ({sectionHeading,heading,description,image,buttonOne,buttonTwo}) => {

    useEffect( () => {
        console.log('DFDSFSDFSD')
        gsap.set(".fadeInUp", {y: "30%", opacity: 0,});
         ScrollTrigger.batch(".fadeInUp", {
           onEnter: batch => gsap.to(batch, {  opacity: 1, duration: .8, delay:0.3, stagger: 0.2, y:0}),
         });
         gsap.set(".fadeInUp-btn", {y: "30%", opacity: 0,});
         ScrollTrigger.batch(".fadeInUp-btn", {
           onEnter: batch => gsap.to(batch, {  opacity: 1, duration: .8, delay:0.6, stagger: 0.2, y:0}),
         });
     }, [])

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

    return (
        <>
            {(sectionHeading || heading || description || image || buttonOne || buttonTwo) && 
                <div className ={`introsec ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                    <div className='container'>
                    <div className="lineEl"></div>
                        <div className='introWrapsec'>
                            <div className='introWrapper'>
                                <div className='introDtl'>
                                    {sectionHeading && <h6 className='label-text'>{sectionHeading}</h6>}
                                    <div className='row'>
                                        {image && 
                                        <div className='col-lg-6'>
                                            <div className='introImg'>
                                                <Image src={image.sourceUrl} width={601} height={398} alt='introImg'/>
                                            </div>
                                        </div>
                                        }
                                        {(heading || description || buttonOne || buttonTwo ) && 
                                        <div className='col-lg-6'>
                                            <div className='introTextdetail'>
                                                {heading && <h3><SplitText copy={heading} role="heading" /></h3>}
                                                
                                                {description && <p className='fadeInUp'>{description}</p>}
                                                <div className="btnbox fadeInUp-btn ">
                                                    {buttonOne && 
                                                        <Link className="elcom-btn primary-black-btn" href={buttonOne.url} target={buttonOne.target}>{buttonOne.title}</Link>
                                                    }
                                                    {buttonTwo && 
                                                    <Link className='tertiary-btn' href={buttonTwo.url} target={buttonTwo.target}>{buttonTwo.title}</Link>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default IntroductionSec;