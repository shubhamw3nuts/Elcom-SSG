import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const CareerpathSec = ({ sectionHeading }) => {
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

  if (sectionHeading) {
    return (
      <>
        <div className={`careerpath ${addClass ? 'visible' : ''}`} ref={inViewRef}>
          <div className='container'>
            <div className="lineEl"></div>
            <div className='career_sec'>
              <span>{sectionHeading}</span>
            </div>
          </div>
        </div>
      </>
    )
  }
  return ''
}

export default CareerpathSec;