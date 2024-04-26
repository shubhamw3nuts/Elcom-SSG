import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import SplitText from '@/component/layouts/SplitText'

const SectiontitleFull = ({ sectionHeading, heading }) => {

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

    if (sectionHeading != '' || heading != '') {
        return (
            <>
                <div className={`upcomingWrap  ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                    <div className="container">
                        <div className="lineEl"></div>
                        <div className="eventdtl">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="eventttl">
                                        {sectionHeading && <h6 className="label-text">{sectionHeading}</h6>}
                                        {heading && <h3><SplitText copy={heading} role="heading" /></h3>}
                                    </div>
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
export default SectiontitleFull;