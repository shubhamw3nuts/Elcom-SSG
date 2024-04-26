import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import SplitText from '@/component/layouts/SplitText';

const LineList = ({ sectionHeading, heading, info }) => {

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

    if (info) {
        return (
            <>
                <div className={`lineListsec ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                    <div className="container">
                        <div className="lineEl"></div>
                        <div className="lineListdtl">
                            {sectionHeading &&
                                <div className="linettl">
                                    <h6>{sectionHeading}</h6>
                                </div>
                            }
                            <div className="lineWrap">
                                <div className="row">
                                    {heading &&
                                        <div className="col-lg-6">
                                            <div className="linelistleft">
                                                <h3><SplitText copy={heading} role="test" /></h3>
                                            </div>
                                        </div>}
                                    {(info) &&
                                        <div className="col-lg-6">
                                            <div className="linelistright">
                                                <ul>
                                                    {info.map((text, index) => {
                                                        if(text?.info){
                                                            return <li key={index}>{text.info}</li>
                                                        }
                                                    })}
                                                </ul>
                                            </div>
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
    return ''
}

export default LineList;