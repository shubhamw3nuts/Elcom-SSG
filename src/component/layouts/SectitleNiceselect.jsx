import SplitText from '@/component/layouts/SplitText'
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const SectitleNiceselect = ({ sectionHeading, heading }) => {
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
                {sectionHeading &&
                    <div className="col-lg-12">
                        <div className="eventttl">
                            <h6 className="label-text">{sectionHeading}</h6>
                        </div>
                    </div>
                }
                {heading &&
                    <div className="col-lg-6">
                        <div className="eventext">
                            <h3><SplitText copy={heading} role="heading" /></h3>
                        </div>
                    </div>
                }
            </>
        )
    }
    return '';
}

export default SectitleNiceselect;