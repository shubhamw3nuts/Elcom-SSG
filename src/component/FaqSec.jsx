import SplitText from './layouts/SplitText'
import { useInView } from 'react-intersection-observer';
import { useState , useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';

const FaqSec = ({sectionHeading,heading,faqInfo}) => {
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

    return(
        <>
            {(sectionHeading || heading || faqInfo) && 
            <div className= {`faqwrap py-xxl ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                <div className="container">
                <div className="lineEl"></div>
                    <div className="faqwrapper">
                        {sectionHeading && <span className="label-text ">{sectionHeading}</span>}
                        <div className="row">
                            {heading && <div className="col-lg-6">
                                <div className="faqdtl">
                                    {<h3><SplitText copy={heading} role="heading" /></h3>}
                                </div>
                            </div>}
                            {(faqInfo && faqInfo.length > 0) && 
                            <div className="col-lg-6">
                                <Accordion defaultActiveKey="0" flush >
                                    {faqInfo.map((faq,index) => {
                                        return <Accordion.Item eventKey={index} key={index}>
                                            {faq.heading && <Accordion.Header>{faq.heading}</Accordion.Header>}
                                            {faq.content && <Accordion.Body>
                                                {faq.content}
                                            </Accordion.Body>}
                                        </Accordion.Item>
                                    })}
                                </Accordion>
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

export default FaqSec;