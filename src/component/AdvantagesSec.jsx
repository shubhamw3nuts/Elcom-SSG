import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useState , useEffect } from 'react';
import SplitText from '@/component/layouts/SplitText';

const Advantages = ({sectionHeading,heading,info}) => {

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
        {(info) && 
        <div className={`advantagesWrap ${addClass ? 'visible' : ''}`} ref={inViewRef}>
            <div className="container">
            <div className="lineEl"></div>
                <div className="advSec">
                    {sectionHeading && 
                    <div className="advWrapper">
                        <h6 className="label-text">{sectionHeading}</h6>
                    </div>
                    }
                    <div className="row">
                        {heading && 
                        <div className="col-lg-4">
                            <div className="advantagesTtl">
                                <h3><SplitText copy={heading} role="heading" /></h3>
                            </div>
                        </div>
                        }
                        {info && 
                        <div className="col-lg-7">
                            {info.map((advantage,index) => {
                            const {heading,description,image} = advantage;
                            if(heading || description){
                                return (
                                    <div className="advProd" key={index}>
                                        <div className="advprodDtl">
                                            {image && 
                                            <div className="advImg flex-shrink-0">
                                                <Image src={image.sourceUrl} width={96} height={96} alt="starIcon"/>
                                            </div>
                                            }
                                            <div className='advText'>
                                                {heading && <h5>{heading}</h5>}
                                                {description && <p>{description}</p>}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            })}
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default Advantages;