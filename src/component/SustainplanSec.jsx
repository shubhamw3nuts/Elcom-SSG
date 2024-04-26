import { useState , useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const SustainplanSec = ({ sectionHeading, content, name, post }) => {

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

    if (sectionHeading || content || name || post) {
        return (
            <>
                <div className={`sustainplan ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                    <div className="container">
                    <div className="lineEl"></div>
                        <div className="sustainwrap">
                            {sectionHeading &&
                                <div className="sustainttl">
                                    <h6 className="label-text">{sectionHeading}</h6>
                                </div>
                            }
                            <div className="sustaindtl">
                                {content && <p className='fadeInUp'>{content}</p>}
                                {name && <h5 className='fadeInUp'>{name}</h5>}
                                {post && <span className='fadeInUp'>{post}</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SustainplanSec;