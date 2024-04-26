import Link from "next/link";
import SplitText from '@/component/layouts/SplitText'
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const SectiontitleSwitch = ({ sectionHeading, heading, buttonInfo }) => {
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

    if (sectionHeading != '' || heading != '' || buttonInfo != '') {
        return (
            <>
                <div className={`sectitleswitch ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                    <div className="container">
                        <div className="lineEl"></div>
                        <div className="slwwrap">
                            <div className="row">
                                {sectionHeading &&
                                    <div className="col-lg-12">
                                        <div className="slwtext">
                                            <h5 className="lebel-text">{sectionHeading}</h5>
                                        </div>
                                    </div>}
                                {heading &&
                                    <div className="col-lg-6 col-md-6">
                                        <h3><SplitText copy={heading} role="heading" /></h3>
                                    </div>
                                }
                                {buttonInfo &&
                                    <div className="col-lg-6 col-md-6">
                                        <div className="btnbox desktopscreen">
                                            <Link className="elcom-btn primary-black-btn" href={buttonInfo.url} target={buttonInfo.target}>{buttonInfo.title}</Link>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return '';
}

export default SectiontitleSwitch;